import 'package:my_fridge_flutter/api/shared_models.dart';

import 'base_response.dart';

class HomeResponse extends BaseResponse {
  final Home? home;
  final List<HomeItem>? homeItems;

  HomeResponse({
    this.home,
    this.homeItems,
    required super.message,
    required super.success,
  });

  factory HomeResponse.fromJson(Map<String, dynamic> json) {
    return HomeResponse(
      home: json['home'] != null ? Home.fromJson(json['home']) : null,
      homeItems: json['homeItems'] != null
          ? List<HomeItem>.from(
              (json['homeItems'] as List<dynamic>)
                  .map((x) => HomeItem.fromJson(x)),
            )
          : null,
      message: json['message'],
      success: json['success'] ?? false,
    );
  }
}
