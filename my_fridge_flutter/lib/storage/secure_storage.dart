import 'package:flutter_secure_storage/flutter_secure_storage.dart';

const storage = FlutterSecureStorage();

void storeAccessToken(String accessToken) async {
  await storage.write(key: 'access_token', value: accessToken);
}

Future<String?> getAccessToken() async {
  return await storage.read(key: 'access_token');
}

void storeRefreshToken(String refreshToken) async {
  await storage.write(key: 'refresh_token', value: refreshToken);
}

Future<String?> getRefreshToken() async {
  return await storage.read(key: 'refresh_token');
}

Future<void> deleteRefreshToken() async {
  await storage.delete(key: 'refresh_token');
}

Future<void> deleteAccessToken() async {
  await storage.delete(key: 'access_token');
}
