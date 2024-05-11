import 'package:flutter/material.dart';

class MealScraper extends StatefulWidget {
  const MealScraper({super.key});

  @override
  _MealScraperState createState() => _MealScraperState();
}

class _MealScraperState extends State<MealScraper> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ask for a meal recipe suggestion!'),
        automaticallyImplyLeading: false,
      ),
      body: const Center(
        child: Text('Coming soon!'),
      ),
    );
  }
}
