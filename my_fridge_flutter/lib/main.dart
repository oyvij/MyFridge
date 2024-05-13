import 'package:flutter/material.dart';
import 'package:my_fridge_flutter/api/api_service.dart';
import 'package:my_fridge_flutter/api/base_response.dart';
import 'package:my_fridge_flutter/api/meal_recipe_response.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'login_screen.dart';
import 'register_screen.dart';
import 'home_screen.dart';

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
  WidgetsFlutterBinding.ensureInitialized();
  SharedPreferences prefs = await SharedPreferences.getInstance();
  bool hasAuth = await checkAuth();

  runApp(MyApp(hasAuth: hasAuth));
}

class MyApp extends StatelessWidget {
  final bool hasAuth;

  const MyApp({super.key, required this.hasAuth});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => MealModel(),
      child: MaterialApp(
        title: 'Flutter Login App',
        initialRoute: hasAuth ? '/home' : '/',
        routes: {
          '/': (context) => const LoginScreen(),
          '/register': (context) => const RegisterScreen(),
          '/home': (context) => const HomeScreen()
        },
      ),
    );
  }
}
