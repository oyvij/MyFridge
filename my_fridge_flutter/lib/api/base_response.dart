class BaseResponse {
  final String message;
  final bool success;

  BaseResponse({required this.message, required this.success});

  factory BaseResponse.fromJson(Map<String, dynamic> json) {
    return BaseResponse(
      message: json['message'],
      success: json['success'] ?? false,
    );
  }
}
