class Home {
  final int? id;
  final int? accountId;
  final String? createdAt;
  final String? updatedAt;

  Home({
    this.id,
    this.accountId,
    this.createdAt,
    this.updatedAt,
  });

  factory Home.fromJson(Map<String, dynamic> json) {
    return Home(
      id: json['id'],
      accountId: json['AccountId'],
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
    );
  }
}

class Item {
  final int? id;
  final String? name;
  final String? ean;
  final String? image;
  final String? externalId;
  final String? brand;
  final String? description;
  final String? vendor;
  final String? categories;
  final String? dataVersion;
  final String? createdAt;
  final String? updatedAt;

  Item({
    this.id,
    this.name,
    this.ean,
    this.image,
    this.externalId,
    this.brand,
    this.description,
    this.vendor,
    this.categories,
    this.dataVersion,
    this.createdAt,
    this.updatedAt,
  });

  factory Item.fromJson(Map<String, dynamic> json) {
    return Item(
      id: json['id'],
      name: json['name'],
      ean: json['ean'],
      image: json['image'],
      externalId: json['external_id'],
      brand: json['brand'],
      description: json['description'],
      vendor: json['vendor'],
      categories: json['categories'],
      dataVersion: json['dataVersion'],
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
    );
  }
}

class HomeItem {
  final int? id;
  final int? homeId;
  final int? itemId;
  final String? createdAt;
  final String? updatedAt;
  final Item? item;

  HomeItem({
    this.id,
    this.homeId,
    this.itemId,
    this.createdAt,
    this.updatedAt,
    this.item,
  });

  factory HomeItem.fromJson(Map<String, dynamic> json) {
    return HomeItem(
      id: json['id'],
      homeId: json['HomeId'],
      itemId: json['ItemId'],
      createdAt: json['createdAt'],
      updatedAt: json['updatedAt'],
      item: Item.fromJson(json['Item']),
    );
  }
}
