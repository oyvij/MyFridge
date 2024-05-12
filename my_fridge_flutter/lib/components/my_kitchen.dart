import 'package:flutter/material.dart';
import 'package:my_fridge_flutter/api/api_service.dart';
import 'package:my_fridge_flutter/api/base_response.dart';
import 'package:my_fridge_flutter/api/home_response.dart';
import 'package:my_fridge_flutter/api/shared_models.dart';
import 'package:my_fridge_flutter/components/barcode_scanner_custom.dart';
import 'package:simple_barcode_scanner/simple_barcode_scanner.dart';

class MyKitchen extends StatefulWidget {
  const MyKitchen({super.key});

  @override
  _MyKitchenState createState() => _MyKitchenState();
}

class _MyKitchenState extends State<MyKitchen> {
  final ApiService _apiService = ApiService();
  HomeResponse _home = HomeResponse(message: '', success: false);
  final TextEditingController _filterController = TextEditingController();
  List<HomeItem> _filteredHomeItems = [];

  @override
  void initState() {
    super.initState();
    initialize() async {
      HomeResponse homeResponse = await _apiService.getOrCreateHome(context);
      setState(() {
        _home = homeResponse;
        _filteredHomeItems = _home.homeItems ?? [];
      });
    }

    initialize();
  }

  void filterList(String query) {
    List<HomeItem> filteredList = _home.homeItems!.where((homeItem) {
      return homeItem.item?.name?.toLowerCase().contains(query.toLowerCase()) ??
          false;
    }).toList();
    setState(() {
      _filteredHomeItems = filteredList;
    });
  }

  Future<bool> _removeHomeItem(int id, BuildContext context) async {
    try {
      BaseResponse removeResponse =
          await _apiService.removeHomeItemById(context, id);
      return removeResponse.success;
    } catch (e) {
      return false;
    }
  }

  Map<String, List<HomeItem>> groupItemsByCategory(List<HomeItem> items) {
    Map<String, List<HomeItem>> groupedItems = {};
    for (var item in items) {
      String categories = item.item?.categories == ''
          ? 'Others'
          : item.item?.categories ?? 'Others';
      if (!groupedItems.containsKey(categories.trim())) {
        groupedItems[categories.trim()] = [];
      }
      groupedItems[categories.trim()]!.add(item);
    }
    return groupedItems;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mykitchen'),
        automaticallyImplyLeading: false,
        actions: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: SizedBox(
              width: MediaQuery.of(context).size.width * 0.6,
              child: TextField(
                controller: _filterController,
                onChanged: (value) {
                  filterList(value);
                },
                decoration: InputDecoration(
                  hintText: 'Search by name...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
      body: Center(
        child: _home.homeItems != null
            ? ListView(
                children: groupItemsByCategory(_filteredHomeItems)
                    .entries
                    .map((entry) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(
                          entry.key,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                      ),
                      Column(
                        children: entry.value.map((item) {
                          return Dismissible(
                            key: Key(item.id.toString()),
                            direction: DismissDirection.endToStart,
                            background: Container(
                              color: Colors.red,
                              alignment: Alignment.centerLeft,
                              padding:
                                  const EdgeInsets.symmetric(horizontal: 20.0),
                              child:
                                  const Icon(Icons.delete, color: Colors.white),
                            ),
                            confirmDismiss: (_) {
                              return showDialog(
                                context: context,
                                builder: (context) => AlertDialog(
                                  title: const Text(
                                      "Are you sure want to remove this item? 🤔"),
                                  content: Text(
                                      "Are you sure you want to remove ${item.item?.name}?"),
                                  actions: [
                                    TextButton(
                                      onPressed: () {
                                        Navigator.of(context).pop(
                                            false); // Dismiss the dialog without deleting
                                      },
                                      child: const Text("No! Wait! 🙅‍♂️"),
                                    ),
                                    TextButton(
                                      onPressed: () async {
                                        final success = await _removeHomeItem(
                                            item.id!, context);
                                        Navigator.of(context).pop(success);
                                      },
                                      child: const Text("Yes, remove it! 🗑️"),
                                    ),
                                  ],
                                ),
                              );
                            },
                            onDismissed: (direction) async {},
                            child: ExpansionTile(
                              title: Row(
                                children: [
                                  if (item.item?.image != null)
                                    Image.network(
                                      item.item!.image!,
                                      width: 40, // Adjust the width as needed
                                      height: 40, // Adjust the height as needed
                                      fit: BoxFit.contain,
                                    ),
                                  const SizedBox(width: 8),
                                  Text(
                                    item.item?.name ?? '',
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 14,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                ],
                              ),
                              children: [
                                ListTile(
                                  title: Text(
                                    item.item?.description ?? '',
                                    style: const TextStyle(
                                        fontWeight: FontWeight.w500,
                                        fontSize: 12,
                                        color: Colors.black87),
                                  ),
                                ),
                                // Add more information here if needed
                              ],
                            ),
                          );
                        }).toList(),
                      ),
                    ],
                  );
                }).toList(),
              )
            : const CircularProgressIndicator(),
      ),
    );
  }
}
