import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:my_fridge_flutter/api/base_response.dart';
import 'package:my_fridge_flutter/api/token_response.dart';
import 'package:my_fridge_flutter/storage/secure_storage.dart';

class ApiService {
  // https://my-fridge-backend-8f9f809b9530.herokuapp.com/api --- http://localhost:5000/api
  final baseUrl = 'http://localhost:5000/api';
  final headers = {'Content-Type': 'application/json'};

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
}
