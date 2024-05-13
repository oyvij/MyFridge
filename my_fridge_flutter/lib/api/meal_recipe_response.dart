import 'package:my_fridge_flutter/api/base_response.dart';

class MealRecipeResponse extends BaseResponse {
  final Meal? meal;

  MealRecipeResponse({
    required super.success,
    required super.message,
    this.meal,
  });

  factory MealRecipeResponse.fromJson(Map<String, dynamic> json) {
    return MealRecipeResponse(
      success: json['success'],
      message: json['message'],
      meal: Meal.fromJson(json['meal']),
    );
  }
}

class Meal {
  final String title;
  final String mealtype;
  final String description;
  final List<Ingredient> ingredients;
  final List<String> steps;

  Meal({
    required this.title,
    required this.mealtype,
    required this.description,
    required this.ingredients,
    required this.steps,
  });

  factory Meal.fromJson(Map<String, dynamic> json) {
    return Meal(
      title: json['title'],
      mealtype: json['mealtype'],
      description: json['description'],
      ingredients: List<Ingredient>.from(
          json['ingredients'].map((i) => Ingredient.fromJson(i))),
      steps: List<String>.from(json['steps']),
    );
  }
}

class Ingredient {
  final String name;
  final String description;
  final String image;

  Ingredient({
    required this.name,
    required this.description,
    required this.image,
  });

  factory Ingredient.fromJson(Map<String, dynamic> json) {
    return Ingredient(
      name: json['name'],
      description: json['description'],
      image: json['image'],
    );
  }
}
