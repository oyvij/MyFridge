import 'package:flutter/material.dart';
import 'package:my_fridge_flutter/api/api_service.dart';
import 'package:my_fridge_flutter/api/base_response.dart';
import 'package:my_fridge_flutter/api/home_response.dart';
import 'package:my_fridge_flutter/components/barcode_scanner_custom.dart';

class BarcodeScannerScreen extends StatefulWidget {
  const BarcodeScannerScreen({super.key});

  @override
  // comment
  _BarcodeScannerScreenState createState() => _BarcodeScannerScreenState();
}

class _BarcodeScannerScreenState extends State<BarcodeScannerScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Scan, find and organize items in your kitchen'),
        automaticallyImplyLeading: false,
      ),
      body: const Center(
          child: Column(
        children: [
          BarcodeScannerCustom(),
          SizedBox(
            height: 10,
          ),
        ],
      )),
    );
  }
}
