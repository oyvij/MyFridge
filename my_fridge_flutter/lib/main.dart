import 'package:flutter/material.dart';
import 'package:my_fridge_flutter/api/api_service.dart';
import 'package:my_fridge_flutter/api/base_response.dart';
import 'login_screen.dart';
import 'register_screen.dart';
import 'home_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';

// Check logged in status
Future<bool> checkAuth() async {
  ApiService apiService = ApiService();
  BaseResponse validateTokenResponse = await apiService.validateToken();
  bool hasAuth = validateTokenResponse.success;
  if (!hasAuth) {
    BaseResponse refreshTokenResponse =
        await apiService.refreshToken_noNavigation();
    hasAuth = refreshTokenResponse.success;
  }
  return hasAuth;
}

void main() async {
// handle exceptions caused by making main async
  WidgetsFlutterBinding.ensureInitialized();

  // init a shared preferences variable
  SharedPreferences prefs = await SharedPreferences.getInstance();

  bool hasAuth = await checkAuth();

  String initialRoute = hasAuth ? '/home' : '/';

  Widget app = MaterialApp(
    title: 'Flutter Login App',
    initialRoute: initialRoute,
    routes: {
      '/': (context) => const LoginScreen(),
      '/register': (context) => const RegisterScreen(),
      '/home': (context) => const HomeScreen()
    },
  );

  runApp(app);
}
