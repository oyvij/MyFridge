import 'package:my_fridge_flutter/api/shared_models.dart';

import 'base_response.dart';

class ItemMatcherResponse extends BaseResponse {
  HomeItem? exactMatchHomeItem;
  List<Item>? similarItems;
  Item? currentItem;

  ItemMatcherResponse({
    this.exactMatchHomeItem,
    this.similarItems,
    this.currentItem,
    required super.message,
    required super.success,
  });

  factory ItemMatcherResponse.fromJson(Map<String, dynamic> json) {
    return ItemMatcherResponse(
      exactMatchHomeItem: json['exactMatchHomeItem'] != null
          ? HomeItem.fromJson(json['exactMatchHomeItem'])
          : null,
      similarItems: json['similarItems'] != null
          ? List<Item>.from(
              (json['similarItems'] as List<dynamic>)
                  .map((x) => Item.fromJson(x)),
            )
          : null,
      currentItem: json['currentItem'] != null
          ? Item.fromJson(json['currentItem'])
          : null,
      message: json['message'],
      success: json['success'] ?? false,
    );
  }
}
