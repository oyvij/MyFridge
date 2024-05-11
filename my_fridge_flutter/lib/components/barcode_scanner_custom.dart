import 'package:flutter/material.dart';
import 'package:my_fridge_flutter/api/api_service.dart';
import 'package:my_fridge_flutter/api/item_matcher_response.dart';
import 'package:simple_barcode_scanner/simple_barcode_scanner.dart';

class BarcodeScannerCustom extends StatefulWidget {
  const BarcodeScannerCustom({super.key});

  @override
  State<BarcodeScannerCustom> createState() => _BarcodeScannerCustomState();
}

class _BarcodeScannerCustomState extends State<BarcodeScannerCustom> {
  final ApiService _apiService = ApiService();
  bool _isWorking = false;
  ItemMatcherResponse? itemMatcherResponse;
  bool _itemAdded = false;

  Future<void> _checkItemAndSetResponse(ean) async {
    setState(() {
      _isWorking = true;
    });

    final itemMatcherResponse = await _apiService.checkItem(ean);

    setState(() {
      this.itemMatcherResponse = itemMatcherResponse;
      _isWorking = false;
      _itemAdded = itemMatcherResponse.message == 'Item is in home.';
    });
  }

  Future<void> _addItemToHome() async {
    // add item to home
    var baseResponse = await _apiService.addItemToHomeByEan(
        context, itemMatcherResponse!.currentItem!.ean!);
    setState(() {
      _itemAdded = baseResponse.success;
    });

    if (baseResponse.success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Item added to home.'),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  Future<void> _removeItemFromHome() async {
    // add item to home
    var baseResponse = await _apiService.removeItemFromHomeByEan(
        context, itemMatcherResponse!.currentItem!.ean!);
    setState(() {
      _itemAdded = !baseResponse.success;
    });

    if (baseResponse.success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Item removed from home.'),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  bool _isEAN(String ean) {
    print(ean.toString());
    return ean.length == 13;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ElevatedButton(
          onPressed: () async {
            var res = await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const SimpleBarcodeScannerPage(),
                ));
            if (res is String) {
              if (!_isWorking && _isEAN(res)) {
                await _checkItemAndSetResponse(res);
              }
            }
          },
          child: const Text('Open Barcode Scanner'),
        ),
        if (itemMatcherResponse != null)
          itemMatcherResponse!.message == 'Item not found.'
              ? const Text('Could not find or get item.',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18))
              : Column(
                  children: [
                    Text(
                        'Scanned item: ${itemMatcherResponse?.currentItem?.ean}',
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 18)),
                    ListTile(
                        title:
                            Text(itemMatcherResponse?.currentItem?.name ?? ''),
                        tileColor: Colors.grey[200],
                        leading: itemMatcherResponse?.currentItem?.image != null
                            ? Image.network(
                                itemMatcherResponse!.currentItem!.image!,
                                width: 40, // Adjust the width as needed
                                height: 40, // Adjust the height as needed
                                fit: BoxFit.contain,
                              )
                            : const Icon(Icons.image), // Placeholder icon
                        trailing:
                            itemMatcherResponse?.message != 'Item is in home.'
                                ? !_itemAdded
                                    ? IconButton(
                                        icon: const Icon(Icons.add),
                                        onPressed: () async {
                                          await _addItemToHome();
                                        },
                                      )
                                    : IconButton(
                                        icon: const Icon(Icons.remove),
                                        onPressed: () async {
                                          await _removeItemFromHome();
                                        },
                                      )
                                : const SizedBox()),
                    const SizedBox(height: 20),
                    itemMatcherResponse?.message == 'Item is in home.'
                        ? Column(
                            children: [
                              const Text(
                                'The scanned item is in you kitchen.',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 18),
                              ),
                              ListTile(
                                title: Text(itemMatcherResponse
                                        ?.exactMatchHomeItem?.item?.name ??
                                    ''),
                                leading: itemMatcherResponse
                                            ?.exactMatchHomeItem?.item?.image !=
                                        null
                                    ? Image.network(
                                        itemMatcherResponse!
                                            .exactMatchHomeItem!.item!.image!,
                                        width: 40, // Adjust the width as needed
                                        height:
                                            40, // Adjust the height as needed
                                        fit: BoxFit.contain,
                                      )
                                    : const Icon(Icons.image),
                              )
                            ],
                          )
                        : const SizedBox(),
                    const SizedBox(height: 20),
                    Column(
                      children: [
                        const Text(
                          'Similar items found in your kitchen.',
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 18),
                        ),
                        ListView.builder(
                          shrinkWrap: true,
                          itemCount:
                              itemMatcherResponse?.similarItems?.length ?? 0,
                          itemBuilder: (context, index) {
                            final item =
                                itemMatcherResponse!.similarItems![index];
                            return ListTile(
                                title: Text(item.name ?? ''),
                                leading: item.image != null
                                    ? Image.network(
                                        item.image!,
                                        width: 40, // Adjust the width as needed
                                        height:
                                            40, // Adjust the height as needed
                                        fit: BoxFit.contain,
                                      )
                                    : const Icon(Icons.image));
                          },
                        )
                      ],
                    ),
                  ],
                ),
      ],
    );
  }
}
