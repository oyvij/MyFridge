import 'package:flutter/material.dart';
import 'package:my_fridge_flutter/api/api_service.dart';
import 'package:my_fridge_flutter/api/base_response.dart';
import 'package:my_fridge_flutter/api/home_response.dart';
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

  @override
  void initState() {
    super.initState();
    initialize() async {
      HomeResponse homeResponse = await _apiService.getOrCreateHome(context);
      setState(() {
        _home = homeResponse;
      });
    }

    initialize();
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _home.homeItems != null
            ? Column(
                children: [
                  const SizedBox(
                    height: 20,
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Expanded(
                    child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: _home.homeItems!.length,
                      itemBuilder: (context, index) {
                        final homeItem = _home.homeItems![index];
                        return Dismissible(
                          key: Key(homeItem.id.toString()),
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
                                    "Are you sure you want to remove ${homeItem.item?.name}?"),
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
                                          homeItem.id!, context);
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
                            leading: homeItem.item?.image != null
                                ? Image.network(
                                    homeItem.item!.image!,
                                    width: 40, // Adjust the width as needed
                                    height: 40, // Adjust the height as needed
                                    fit: BoxFit.contain,
                                  )
                                : const Icon(Icons.image), // Placeholder icon
                            title: Text(
                              homeItem.item?.name ?? '',
                              style: const TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 18),
                            ),
                            children: [
                              ListTile(
                                title: Text(
                                  homeItem.item?.description ?? '',
                                  style: const TextStyle(
                                      fontWeight: FontWeight.w500,
                                      fontSize: 14,
                                      color: Colors.black87),
                                ),
                              ),
                              // Add more information here if needed
                            ],
                          ),
                        );
                      },
                    ),
                  )
                ],
              )
            : const CircularProgressIndicator(),
      ),
    );
  }
}
