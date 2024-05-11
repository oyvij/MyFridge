import 'dart:html';

import 'package:flutter/material.dart';
import 'package:my_fridge_flutter/api/api_service.dart';
import 'package:my_fridge_flutter/barcode_scanner_screen.dart';
import 'package:my_fridge_flutter/components/barcode_scanner_custom.dart';
import 'package:my_fridge_flutter/components/meal_scraper.dart';
import 'package:my_fridge_flutter/components/my_kitchen.dart';
import 'package:my_fridge_flutter/storage/secure_storage.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  _SettingsScreenState createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  void _logout(BuildContext context) {
    deleteAccessToken();
    deleteRefreshToken();
    Navigator.pushNamed(context, '/');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Account, and Settings'),
          automaticallyImplyLeading: false,
        ),
        body: Center(
            child: Column(children: [
          const SizedBox(
            height: 60,
          ),
          ElevatedButton(
            onPressed: () => {_logout(context)},
            child: const Text('Logout', style: TextStyle(fontSize: 18)),
          )
        ])));
  }
}
