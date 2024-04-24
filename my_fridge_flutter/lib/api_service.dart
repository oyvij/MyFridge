import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl =
      'https://my-fridge-backend-8f9f809b9530.herokuapp.com'; // Replace with your actual URL

  Future<bool> registerAccount(
      String email, String password, String password2) async {
    try {
      var response = await http.post(
        Uri.parse('$baseUrl/register'), // Adjust path as per your API
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': email,
          'password': password,
          'password2': password2,
        }),
      );

      var data = jsonDecode(response.body);
      return data;
    } catch (e) {
      print('Caught error: $e');
      return false;
    }
  }
}
