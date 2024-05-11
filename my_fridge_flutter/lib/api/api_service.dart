import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:my_fridge_flutter/api/base_response.dart';
import 'package:my_fridge_flutter/api/home_response.dart';
import 'package:my_fridge_flutter/api/item_matcher_response.dart';
import 'package:my_fridge_flutter/api/token_response.dart';
import 'package:my_fridge_flutter/storage/secure_storage.dart';
import 'package:flutter/material.dart';

class ApiService {
  // https://my-fridge-backend-8f9f809b9530.herokuapp.com/api --- http://localhost:5000/api
  final baseUrl = 'https://my-fridge-backend-8f9f809b9530.herokuapp.com/api';
  var headers = {'Content-Type': 'application/json', 'Authorization': ''};

  Future<BaseResponse> registerAccount(
      String email, String password, String password2) async {
    try {
      var response = await http.post(
        Uri.parse('$baseUrl/accounts/register'),
        headers: headers,
        body: jsonEncode({
          'email': email,
          'password': password,
          'password2': password2,
        }),
      );
      var data = jsonDecode(response.body);
      return BaseResponse.fromJson(data);
    } catch (e) {
      return BaseResponse(message: 'An error occurred', success: false);
    }
  }

  Future<BaseResponse> login(String email, String password) async {
    try {
      var response = await http.post(
        Uri.parse('$baseUrl/accounts/login'),
        headers: headers,
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );
      var data = jsonDecode(response.body);
      var tokenResponse = TokenResponse.fromJson(data);
      storeAccessToken(tokenResponse.accessToken);
      storeRefreshToken(tokenResponse.refreshToken);
      return BaseResponse.fromJson(data);
    } catch (e) {
      return BaseResponse(
        message: 'An error occurred',
        success: false,
      );
    }
  }

  Future<BaseResponse> refreshToken(BuildContext context) async {
    try {
      var refreshToken = await getRefreshToken();
      var response = await http.post(
        Uri.parse('$baseUrl/accounts/refresh-token'),
        headers: headers,
        body: jsonEncode({
          'refreshToken': refreshToken,
        }),
      );
      var data = jsonDecode(response.body);
      var tokenResponse = TokenResponse.fromJson(data);
      if (tokenResponse.success) {
        storeAccessToken(tokenResponse.accessToken);
      } else if (tokenResponse.message == 'Invalid refresh token.' ||
          tokenResponse.message == 'No refresh token provided.') {
        await deleteAccessToken();
        await deleteRefreshToken();
        Navigator.pushNamed(context, '/login');
      }
      return BaseResponse.fromJson(data);
    } catch (e) {
      return BaseResponse(
        message: 'An error occurred',
        success: false,
      );
    }
  }

  Future<void> updateHeaders() async {
    var accessToken = await getAccessToken();
    headers['Authorization'] = 'Bearer $accessToken';
  }

  Future<HomeResponse> getOrCreateHome(BuildContext context) async {
    Future<http.Response> performRequest() async {
      await updateHeaders(); // Ensure headers are updated before making the request
      return http.get(
        Uri.parse('$baseUrl/homes'),
        headers: headers,
      );
    }

    try {
      var response = await performRequest();
      if (response.statusCode == 403) {
        await refreshToken(context);
        response = await performRequest();
      }
      var data = jsonDecode(response.body);
      HomeResponse homeResponse = HomeResponse.fromJson(data);
      if (homeResponse.message == 'Home not found.') {
        BaseResponse createHomeResponse = await createHome(context);
        if (createHomeResponse.success) {
          return getOrCreateHome(context);
        }
      }
      return homeResponse;
    } catch (e) {
      print(e);
      return HomeResponse(
        message: 'An error occurred',
        success: false,
      );
    }
  }

  Future<BaseResponse> createHome(BuildContext context) async {
    Future<http.Response> performRequest() async {
      await updateHeaders(); // Ensure headers are updated before making the request
      return http.post(
        Uri.parse('$baseUrl/homes/create'),
        headers: headers,
      );
    }

    try {
      var response = await performRequest();
      if (response.statusCode == 403) {
        await refreshToken(context);
        response = await performRequest();
      }
      var data = jsonDecode(response.body);
      return BaseResponse.fromJson(data);
    } catch (e) {
      return BaseResponse(
        message: 'An error occurred',
        success: false,
      );
    }
  }

  Future<BaseResponse> removeHomeItemById(BuildContext context, int id) async {
    Future<http.Response> performRequest() async {
      await updateHeaders(); // Ensure headers are updated before making the request
      return http.delete(
        Uri.parse('$baseUrl/homes/remove-item-by-id'),
        headers: headers,
        body: jsonEncode({
          'id': id,
        }),
      );
    }

    try {
      var response = await performRequest();
      if (response.statusCode == 403) {
        await refreshToken(context);
        response = await performRequest();
      }
      var data = jsonDecode(response.body);
      return BaseResponse.fromJson(data);
    } catch (e) {
      return BaseResponse(
        message: 'An error occurred',
        success: false,
      );
    }
  }

  Future<ItemMatcherResponse> checkItem(String ean) async {
    Future<http.Response> performRequest() async {
      await updateHeaders(); // Ensure headers are updated before making the request
      return http.post(
        Uri.parse('$baseUrl/homes/check-item'),
        headers: headers,
        body: jsonEncode({
          'ean': ean,
        }),
      );
    }

    try {
      var response = await performRequest();
      var data = jsonDecode(response.body);
      return ItemMatcherResponse.fromJson(data);
    } catch (e) {
      return ItemMatcherResponse(
        message: 'An error occurred',
        success: false,
      );
    }
  }

  Future<BaseResponse> addItemToHomeByEan(
      BuildContext context, String ean) async {
    Future<http.Response> performRequest() async {
      await updateHeaders(); // Ensure headers are updated before making the request
      return http.post(
        Uri.parse('$baseUrl/homes/add-item-by-ean'),
        headers: headers,
        body: jsonEncode({
          'ean': ean,
        }),
      );
    }

    try {
      var response = await performRequest();
      if (response.statusCode == 403) {
        await refreshToken(context);
        response = await performRequest();
      }
      var data = jsonDecode(response.body);
      return BaseResponse.fromJson(data);
    } catch (e) {
      return BaseResponse(
        message: 'An error occurred',
        success: false,
      );
    }
  }

  Future<BaseResponse> removeItemFromHomeByEan(
      BuildContext context, String ean) async {
    Future<http.Response> performRequest() async {
      await updateHeaders(); // Ensure headers are updated before making the request
      return http.delete(
        Uri.parse('$baseUrl/homes/remove-item-by-ean'),
        headers: headers,
        body: jsonEncode({
          'ean': ean,
        }),
      );
    }

    try {
      var response = await performRequest();
      if (response.statusCode == 403) {
        await refreshToken(context);
        response = await performRequest();
      }
      var data = jsonDecode(response.body);
      return BaseResponse.fromJson(data);
    } catch (e) {
      return BaseResponse(
        message: 'An error occurred',
        success: false,
      );
    }
  }
}
