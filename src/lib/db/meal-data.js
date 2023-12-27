export const mealData = [
  {
    name: "Muscle Gain Meal Plan",
    description:
      "High-protein and nutrient-dense meals to fuel your workouts and build muscle.",
    image:
      "https://yourfakeaway.com/wp-content/uploads/2023/04/YFA_Feb23_menu_dishes-9-300x300.jpg",
    category: "Dietary Goals",
    categories: [
      {
        name: "Breakfast",
        meals: [
          {
            name: "Scrambled Eggs with Spinach and Whole-wheat Toast",
            ingredients: [
              "eggs",
              "spinach",
              "whole-wheat bread",
              "cheese",
              "pepper",
              "milk",
            ],
            nutrients: { protein: "25g", carbs: "30g", fat: "15g" },
            prep_time: 15,
          },
          {
            name: "Greek Yogurt with Fruit and Granola",
            ingredients: [
              "greek yogurt",
              "berries",
              "granola",
              "honey",
              "nuts",
            ],
            nutrients: { protein: "20g", carbs: "30g", fat: "10g" },
            prep_time: 5,
          },
          // ... more breakfast meals
        ],
      },
      {
        name: "Lunch",
        meals: [
          {
            name: "Chicken Breast with Brown Rice and Roasted Vegetables",
            ingredients: [
              "chicken breast",
              "brown rice",
              "broccoli",
              "sweet potato",
              "olive oil",
              "spices",
            ],
            nutrients: { protein: "30g", carbs: "40g", fat: "15g" },
            prep_time: 30,
          },
          {
            name: "Tuna Salad Sandwich on Whole-wheat Bread",
            ingredients: [
              "tuna",
              "mayonnaise",
              "celery",
              "onion",
              "whole-wheat bread",
              "lettuce",
              "tomato",
            ],
            nutrients: { protein: "25g", carbs: "35g", fat: "10g" },
            prep_time: 10,
          },
          // ... more lunch meals
        ],
      },
      {
        name: "Dinner",
        meals: [
          {
            name: "Salmon with Quinoa and Roasted Broccoli",
            ingredients: [
              "salmon fillet",
              "quinoa",
              "broccoli",
              "lemon juice",
              "olive oil",
              "herbs",
            ],
            nutrients: { protein: "35g", carbs: "40g", fat: "20g" },
            prep_time: 25,
          },
          {
            name: "Turkey Chili with Whole-wheat Cornbread",
            ingredients: [
              "ground turkey",
              "kidney beans",
              "black beans",
              "tomatoes",
              "broth",
              "spices",
              "cornbread mix",
            ],
            nutrients: { protein: "30g", carbs: "45g", fat: "15g" },
            prep_time: 40,
          },
          // ... more dinner meals
        ],
      },
      {
        name: "Snacks",
        meals: [
          {
            name: "Protein Shake",
            ingredients: "protein powder, milk, fruit, spinach",
            nutrients: { protein: "25g", carbs: "20g", fat: "5g" },
            prep_time: 5,
          },
          {
            name: "Cottage Cheese with Fruit",
            ingredients: ["cottage cheese", "berries", "honey", "nuts"],
            nutrients: { protein: "20g", carbs: "15g", fat: "5g" },
            prep_time: 5,
          },
          // ... more snack options
        ],
      },
    ],
  },
  {
    name: "Fat Loss Meal Plan",
    description:
      "Healthy meals to support fat loss and maintain energy levels.",
    image:
      "https://yourfakeaway.com/wp-content/uploads/2023/04/YFA_April_2023_dishes-43-300x300.jpg",
    category: "Dietary Goals",
    categories: [
      {
        name: "Breakfast",
        meals: [
          {
            name: "Oatmeal with Berries and Nuts",
            ingredients: ["oatmeal", "berries", "nuts", "milk", "honey"],
            nutrients: { protein: "15g", carbs: "30g", fat: "10g" },
            prep_time: 10,
          },
          {
            name: "Smoothie with Spinach, Banana, and Protein Powder",
            ingredients: ["spinach", "banana", "protein powder", "milk"],
            nutrients: { protein: "20g", carbs: "25g", fat: "5g" },
            prep_time: 5,
          },
          // ... more breakfast meals
        ],
      },
      {
        name: "Lunch",
        meals: [
          {
            name: "Grilled Chicken Salad with Mixed Greens",
            ingredients: [
              "grilled chicken",
              "mixed greens",
              "tomatoes",
              "cucumbers",
              "avocado",
              "olive oil",
            ],
            nutrients: { protein: "25g", carbs: "20g", fat: "15g" },
            prep_time: 15,
          },
          {
            name: "Lentil Soup with Whole-wheat Bread",
            ingredients: ["lentils", "vegetables", "whole-wheat bread"],
            nutrients: { protein: "20g", carbs: "30g", fat: "5g" },
            prep_time: 30,
          },
          // ... more lunch meals
        ],
      },
      {
        name: "Dinner",
        meals: [
          {
            name: "Baked Cod with Roasted Sweet Potatoes",
            ingredients: [
              "cod fillet",
              "sweet potatoes",
              "olive oil",
              "spices",
            ],
            nutrients: { protein: "30g", carbs: "35g", fat: "10g" },
            prep_time: 25,
          },
          {
            name: "Turkey Stir-fry with Brown Rice and Vegetables",
            ingredients: [
              "ground turkey",
              "brown rice",
              "vegetables",
              "soy sauce",
              "sesame oil",
            ],
            nutrients: { protein: "25g", carbs: "40g", fat: "8g" },
            prep_time: 20,
          },
          // ... more dinner meals
        ],
      },
      {
        name: "Snacks",
        meals: [
          {
            name: "Apple Slices with Almond Butter",
            ingredients: ["apple", "almond butter"],
            nutrients: { protein: "5g", carbs: "15g", fat: "8g" },
            prep_time: 5,
          },
          {
            name: "Carrot Sticks with Hummus",
            ingredients: ["carrot sticks", "hummus"],
            nutrients: { protein: "4g", carbs: "10g", fat: "6g" },
            prep_time: 5,
          },
          // ... more snack options
        ],
      },
      // ... Other categories with meals and nutrients
    ],
  },
  {
    name: "Vegan Meal Plan",
    description: "Plant-based meals suitable for vegans.",
    image:
      "https://yourfakeaway.com/wp-content/uploads/2023/04/YFA_April_2023_dishes-44-300x300.jpg",
    category: "Dietary Restrictions",
    categories: [
      {
        name: "Breakfast",
        meals: [
          {
            name: "Tofu Scramble with Vegetables",
            ingredients: ["tofu", "vegetables", "spices"],
            nutrients: { protein: "20g", carbs: "15g", fat: "10g" },
            prep_time: 15,
          },
          {
            name: "Chia Pudding with Fruit and Nuts",
            ingredients: ["chia seeds", "fruit", "nuts", "plant-based milk"],
            nutrients: { protein: "10g", carbs: "20g", fat: "8g" },
            prep_time: 5,
          },
          // ... more breakfast meals
        ],
      },
      {
        name: "Lunch",
        meals: [
          {
            name: "Black Bean Burger on a Whole-wheat Bun",
            ingredients: [
              "black bean patty",
              "whole-wheat bun",
              "lettuce",
              "tomato",
              "onion",
            ],
            nutrients: { protein: "18g", carbs: "30g", fat: "10g" },
            prep_time: 20,
          },
          {
            name: "Lentil Soup with Whole-wheat Bread",
            ingredients: ["lentils", "vegetables", "whole-wheat bread"],
            nutrients: { protein: "15g", carbs: "25g", fat: "5g" },
            prep_time: 30,
          },
          // ... more lunch meals
        ],
      },
      {
        name: "Dinner",
        meals: [
          {
            name: "Vegetable Stir-fry with Brown Rice",
            ingredients: [
              "mixed vegetables",
              "tofu",
              "brown rice",
              "soy sauce",
              "sesame oil",
            ],
            nutrients: { protein: "15g", carbs: "35g", fat: "8g" },
            prep_time: 25,
          },
          {
            name: "Tofu Tacos with All the Fixings",
            ingredients: [
              "tofu",
              "taco shells",
              "lettuce",
              "tomato",
              "salsa",
              "guacamole",
            ],
            nutrients: { protein: "18g", carbs: "25g", fat: "12g" },
            prep_time: 20,
          },
          // ... more dinner meals
        ],
      },
      {
        name: "Snacks",
        meals: [
          {
            name: "Hummus with Vegetables",
            ingredients: [
              "hummus",
              "bell peppers",
              "carrot sticks",
              "cucumber",
            ],
            nutrients: { protein: "4g", carbs: "10g", fat: "8g" },
            prep_time: 5,
          },
          {
            name: "Apple Slices with Almond Butter",
            ingredients: ["apple", "almond butter"],
            nutrients: { protein: "5g", carbs: "15g", fat: "8g" },
            prep_time: 5,
          },
          // ... more snack options
        ],
      },
      // ... Other categories with meals and nutrients
    ],
  },
  {
    name: "Pescatarian Meal Plan",
    description:
      "A seafood-based meal plan for those following a pescatarian diet.",
    image:
      "https://yourfakeaway.com/wp-content/uploads/2022/11/EnglishMuffin-300x300.jpg",
    category: "Dietary Restrictions",
    categories: [
      {
        name: "Breakfast",
        meals: [
          {
            name: "Smoked Salmon with Avocado Toast",
            ingredients: [
              "smoked salmon",
              "avocado",
              "whole-grain bread",
              "lemon",
              "herbs",
            ],
            nutrients: { protein: "20g", carbs: "25g", fat: "15g" },
            prep_time: 10,
          },
          {
            name: "Greek Yogurt with Fruit and Granola",
            ingredients: [
              "greek yogurt",
              "berries",
              "granola",
              "honey",
              "nuts",
            ],
            nutrients: { protein: "15g", carbs: "25g", fat: "8g" },
            prep_time: 5,
          },
          // ... more breakfast meals
        ],
      },
      {
        name: "Lunch",
        meals: [
          {
            name: "Tuna Salad Sandwich on Whole-wheat Bread",
            ingredients: [
              "tuna",
              "mayonnaise",
              "celery",
              "onion",
              "whole-wheat bread",
              "lettuce",
              "tomato",
            ],
            nutrients: { protein: "20g", carbs: "30g", fat: "10g" },
            prep_time: 10,
          },
          {
            name: "Salmon Salad with Mixed Greens",
            ingredients: [
              "salmon fillet",
              "mixed greens",
              "olive oil",
              "tomatoes",
              "cucumber",
            ],
            nutrients: { protein: "25g", carbs: "20g", fat: "12g" },
            prep_time: 15,
          },
          // ... more lunch meals
        ],
      },
      {
        name: "Dinner",
        meals: [
          {
            name: "Baked Cod with Roasted Vegetables",
            ingredients: [
              "cod fillet",
              "bell peppers",
              "zucchini",
              "olive oil",
              "herbs",
            ],
            nutrients: { protein: "30g", carbs: "35g", fat: "10g" },
            prep_time: 25,
          },
          {
            name: "Shrimp Stir-fry with Brown Rice and Vegetables",
            ingredients: [
              "shrimp",
              "brown rice",
              "vegetables",
              "soy sauce",
              "sesame oil",
            ],
            nutrients: { protein: "28g", carbs: "40g", fat: "12g" },
            prep_time: 15,
          },
          // ... more dinner meals
        ],
      },
      {
        name: "Snacks",
        meals: [
          {
            name: "Edamame",
            ingredients: ["edamame beans", "sea salt"],
            nutrients: { protein: "8g", carbs: "10g", fat: "4g" },
            prep_time: 5,
          },
          {
            name: "Cottage Cheese with Fruit",
            ingredients: ["cottage cheese", "berries", "honey", "nuts"],
            nutrients: { protein: "15g", carbs: "10g", fat: "8g" },
            prep_time: 5,
          },
          // ... more snack options
        ],
      },
    ],
  },
  {
    name: "Vegetarian Meal Plan",
    description:
      "Delicious vegetarian meals for a balanced and satisfying diet.",
    image:
      "https://yourfakeaway.com/wp-content/uploads/2022/11/BreakfastWrap-300x300.jpg",
    category: "Dietary Restrictions",
    categories: [
      {
        name: "Breakfast",
        meals: [
          {
            name: "Whole-wheat Pancakes with Fruit and Yogurt",
            ingredients: [
              "whole-wheat pancakes",
              "fruit",
              "yogurt",
              "maple syrup",
            ],
            nutrients: { protein: "10g", carbs: "30g", fat: "5g" },
            prep_time: 20,
          },
          {
            name: "Veggie Omelet with Spinach and Cheese",
            ingredients: ["eggs", "spinach", "cheese", "onion", "bell peppers"],
            nutrients: { protein: "15g", carbs: "10g", fat: "8g" },
            prep_time: 15,
          },
          // ... more breakfast meals
        ],
      },
      {
        name: "Lunch",
        meals: [
          {
            name: "Quinoa Salad with Grilled Vegetables",
            ingredients: [
              "quinoa",
              "mixed vegetables",
              "olive oil",
              "feta cheese",
              "balsamic vinaigrette",
            ],
            nutrients: { protein: "12g", carbs: "25g", fat: "10g" },
            prep_time: 25,
          },
          {
            name: "Black Bean Soup with Whole-wheat Tortillas",
            ingredients: ["black beans", "vegetables", "whole-wheat tortillas"],
            nutrients: { protein: "15g", carbs: "30g", fat: "5g" },
            prep_time: 30,
          },
          // ... more lunch meals
        ],
      },
      {
        name: "Dinner",
        meals: [
          {
            name: "Vegetable Lasagna",
            ingredients: [
              "lasagna noodles",
              "ricotta cheese",
              "tomato sauce",
              "zucchini",
              "spinach",
            ],
            nutrients: { protein: "18g", carbs: "40g", fat: "12g" },
            prep_time: 40,
          },
          {
            name: "Vegetarian Chili with Cornbread",
            ingredients: [
              "kidney beans",
              "black beans",
              "tomatoes",
              "corn",
              "spices",
              "cornbread",
            ],
            nutrients: { protein: "20g", carbs: "35g", fat: "10g" },
            prep_time: 35,
          },
          // ... more dinner meals
        ],
      },
      {
        name: "Snacks",
        meals: [
          {
            name: "Cottage Cheese with Fruit",
            ingredients: ["cottage cheese", "berries", "honey", "nuts"],
            nutrients: { protein: "15g", carbs: "10g", fat: "8g" },
            prep_time: 5,
          },
          {
            name: "Trail Mix",
            ingredients: ["nuts", "dried fruits", "seeds", "dark chocolate"],
            nutrients: { protein: "8g", carbs: "15g", fat: "10g" },
            prep_time: 5,
          },
          // ... more snack options
        ],
      },
    ],
  },
];