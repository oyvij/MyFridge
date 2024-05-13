import 'package:flutter/material.dart';
import 'package:my_fridge_flutter/api/api_service.dart';
import 'package:my_fridge_flutter/api/meal_recipe_response.dart';
import 'package:provider/provider.dart';

class MealScraper extends StatefulWidget {
  const MealScraper({super.key});

  @override
  _MealScraperState createState() => _MealScraperState();
}

class _MealScraperState extends State<MealScraper> {
  final ApiService _apiService = ApiService();
  bool _strict = true;
  List<String> mealtypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  String selectedMealtype = 'Dinner';
  bool _creatingMeal = false;

  void scrapeMeal() async {
    setState(() {
      _creatingMeal = true;
    });
    try {
      MealRecipeResponse mealRecipeResponse =
          await _apiService.scrapeMealRecipe(selectedMealtype, _strict);
      Provider.of<MealModel>(context, listen: false)
          .updateMealRecipeResponse(mealRecipeResponse);
      setState(() {
        _creatingMeal = false;
      });
    } catch (e) {
      setState(() {
        Provider.of<MealModel>(context, listen: false).updateMealRecipeResponse(
            MealRecipeResponse(message: 'An error occurred', success: false));
        _creatingMeal = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ask for a meal recipe suggestion!'),
        automaticallyImplyLeading: false,
      ),
      body: Center(
          child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(left: 10.0),
                  child: Row(
                    children: [
                      const Text('Choose what meal you want: '),
                      DropdownButton<String>(
                        value: selectedMealtype,
                        onChanged: (String? value) {
                          setState(() {
                            selectedMealtype = value!;
                          });
                        },
                        items: mealtypes
                            .map<DropdownMenuItem<String>>((String value) {
                          return DropdownMenuItem<String>(
                            value: value,
                            child: Text(value),
                          );
                        }).toList(),
                      )
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(bottom: 10.0),
                  child: Row(
                    children: [
                      Checkbox(
                          value: _strict,
                          onChanged: (bool? value) {
                            setState(() {
                              _strict = value!;
                            });
                          }),
                      const Text('Only show recipes with ingredients I have'),
                    ],
                  ),
                ),
                ElevatedButton(
                    child: const Text('Scrape me a meal!'),
                    onPressed: () {
                      scrapeMeal();
                    })
              ],
            ),
            Padding(
              padding: const EdgeInsets.only(top: 20.0),
              child: _creatingMeal
                  ? const CircularProgressIndicator()
                  : Provider.of<MealModel>(context).mealRecipeResponse ==
                              null ||
                          !Provider.of<MealModel>(context)
                              .mealRecipeResponse!
                              .success
                      ? const Text("No meal created.")
                      : SingleChildScrollView(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Padding(
                                  padding: const EdgeInsets.only(
                                      bottom: 10.0, top: 10.0),
                                  child: Text(
                                      Provider.of<MealModel>(context)
                                          .mealRecipeResponse!
                                          .meal!
                                          .title,
                                      style: const TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold))),
                              Padding(
                                padding: const EdgeInsets.only(
                                    bottom: 10.0, top: 10.0),
                                child: Text(
                                    Provider.of<MealModel>(context)
                                        .mealRecipeResponse!
                                        .meal!
                                        .mealtype,
                                    style: const TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold)),
                              ),
                              Padding(
                                  padding: const EdgeInsets.only(
                                      bottom: 10.0, top: 10.0),
                                  child: Column(
                                    children: [
                                      const Text('Description:',
                                          style: TextStyle(
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold)),
                                      Text(
                                          Provider.of<MealModel>(context)
                                              .mealRecipeResponse!
                                              .meal!
                                              .description,
                                          style: const TextStyle(
                                              fontSize: 14,
                                              fontWeight: FontWeight.normal))
                                    ],
                                  )),
                              Padding(
                                padding: const EdgeInsets.only(
                                    bottom: 10.0, top: 10.0),
                                child: Column(
                                  children: [
                                    const Text('Ingredients:',
                                        style: TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold)),
                                    ListView(
                                      shrinkWrap: true,
                                      children: Provider.of<MealModel>(context)
                                          .mealRecipeResponse!
                                          .meal!
                                          .ingredients
                                          .map((item) {
                                        return Row(
                                          children: [
                                            Image.network(
                                              item.image,
                                              width:
                                                  40, // Adjust the width as needed
                                              height:
                                                  40, // Adjust the height as needed
                                              fit: BoxFit.contain,
                                            ),
                                            const SizedBox(width: 8),
                                            Flexible(
                                              child: Text(item.name,
                                                  style: const TextStyle(
                                                    fontWeight: FontWeight.bold,
                                                    fontSize: 14,
                                                  )),
                                            )
                                          ],
                                        );
                                      }).toList(),
                                    ),
                                  ],
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(
                                    bottom: 10.0, top: 10.0),
                                child: Column(
                                  children: [
                                    const Text('Steps:',
                                        style: TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.bold)),
                                    ListView(
                                      shrinkWrap: true,
                                      children: Provider.of<MealModel>(context)
                                          .mealRecipeResponse!
                                          .meal!
                                          .steps
                                          .map((step) {
                                        return ListTile(
                                          title: Text(step,
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.w500,
                                                  fontSize: 12,
                                                  color: Colors.black87)),
                                        );
                                      }).toList(),
                                    )
                                  ],
                                ),
                              )
                            ],
                          ),
                        ),
            ),
          ],
        ),
      )),
    );
  }
}
