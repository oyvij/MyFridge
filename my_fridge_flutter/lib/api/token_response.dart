import 'base_response.dart';

class TokenResponse extends BaseResponse {
  final String accessToken;
  final String refreshToken;

  TokenResponse({
    required this.accessToken,
    required this.refreshToken,
    required super.message,
    required super.success,
  });

  factory TokenResponse.fromJson(Map<String, dynamic> json) {
    return TokenResponse(
      accessToken: json['accessToken'] ?? '',
      refreshToken: json['refreshToken'] ?? '',
      message: json['message'],
      success: json['success'] ?? false,
    );
  }
}
