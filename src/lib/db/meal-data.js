export const mealData = [
  {
    name: "Muscle Gain Meal Plan",
    description:
      "High-protein and nutrient-dense meals to fuel your workouts and build muscle.",
    cover_img: "https://media.istockphoto.com/id/178452025/photo/basket-with-several-fruits-and-vegetables.jpg?s=612x612&w=0&k=20&c=bMr0UomQEP2-HE_7gqFfqEleRsPkIvbbK3CjJR18a4Y=",
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
            img: "https://images.unsplash.com/photo-1617054240991-b0ffce6600da?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            img: "https://images.unsplash.com/photo-1526893628193-76477eb4bc8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R3JlZWslMjBZb2d1cnQlMjB3aXRoJTIwRnJ1aXQlMjBhbmQlMjBHcmFub2xhfGVufDB8fDB8fHww"
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
            img: "https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            img: "https://images.unsplash.com/photo-1676138937661-63d9fa279445?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            img: "https://images.unsplash.com/photo-1598511796432-32663d0875bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            img: "https://images.unsplash.com/photo-1600626334697-2b025169fb1e?q=80&w=1521&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            img: "https://images.unsplash.com/photo-1595348020949-87cdfbb44174?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            name: "Cottage Cheese with Fruit",
            ingredients: ["cottage cheese", "berries", "honey", "nuts"],
            nutrients: { protein: "20g", carbs: "15g", fat: "5g" },
            prep_time: 5,
            img: "https://images.unsplash.com/photo-1516100970402-530cfdf696d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q290dGFnZSUyMENoZWVzZSUyMHdpdGglMjBGcnVpdHxlbnwwfHwwfHx8MA%3D%3D"
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
    cover_img: "https://media.istockphoto.com/id/927883342/photo/selection-of-healthy-food-sources-healthy-eating-concept-ketogenic-diet-concept.jpg?s=612x612&w=0&k=20&c=7WboczTybv0DjzzN0emB77rXZsg9Sl_DpP5yA24JXPY=",
    categories: [
      {
        name: "Breakfast",
        meals: [
          {
            name: "Oatmeal with Berries and Nuts",
            ingredients: ["oatmeal", "berries", "nuts", "milk", "honey"],
            nutrients: { protein: "15g", carbs: "30g", fat: "10g" },
            prep_time: 10,
            img: "https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8T2F0bWVhbCUyMHdpdGglMjBCZXJyaWVzJTIwYW5kJTIwTnV0c3xlbnwwfHwwfHx8MA%3D%3D"
          },
          {
            name: "Smoothie with Spinach, Banana, and Protein Powder",
            ingredients: ["spinach", "banana", "protein powder", "milk"],
            nutrients: { protein: "20g", carbs: "25g", fat: "5g" },
            prep_time: 5,
            img: "https://images.unsplash.com/photo-1623227773277-a4e4a5f40284?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U21vb3RoaWUlMjB3aXRoJTIwU3BpbmFjaCUyQyUyMEJhbmFuYSUyQyUyMGFuZCUyMFByb3RlaW4lMjBQb3dkZXJ8ZW58MHx8MHx8fDA%3D"
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
            img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R3JpbGxlZCUyMENoaWNrZW4lMjBTYWxhZCUyMHdpdGglMjBNaXhlZCUyMEdyZWVuc3xlbnwwfHwwfHx8MA%3D%3D"
          },
          {
            name: "Lentil Soup with Whole-wheat Bread",
            ingredients: ["lentils", "vegetables", "whole-wheat bread"],
            nutrients: { protein: "20g", carbs: "30g", fat: "5g" },
            prep_time: 30,
            img: "https://images.unsplash.com/photo-1478749485505-2a903a729c63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TGVudGlsJTIwU291cCUyMHdpdGglMjBXaG9sZSUyMHdoZWF0JTIwQnJlYWR8ZW58MHx8MHx8fDA%3D"
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
            img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFrZWQlMjBDb2QlMjB3aXRoJTIwUm9hc3RlZCUyMFN3ZWV0JTIwUG90YXRvZXN8ZW58MHx8MHx8fDA%3D"
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
            img: "https://images.unsplash.com/photo-1543826173-1beeb97525d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3RpciUyMGZyeSUyMHdpdGglMjBCcm93biUyMFJpY2UlMjBhbmQlMjBWZWdldGFibGVzfGVufDB8fDB8fHww"
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
            img: "https://images.unsplash.com/photo-1601045569976-699bac2727ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXBwbGUlMjBTbGljZXMlMjB3aXRoJTIwQWxtb25kJTIwQnV0dGVyfGVufDB8fDB8fHww"
          },
          {
            name: "Carrot Sticks with Hummus",
            ingredients: ["carrot sticks", "hummus"],
            nutrients: { protein: "4g", carbs: "10g", fat: "6g" },
            prep_time: 5,
            img: "https://images.unsplash.com/photo-1591299177061-2151e53fcaea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2Fycm90JTIwU3RpY2tzJTIwd2l0aCUyMEh1bW11c3xlbnwwfHwwfHx8MA%3D%3D"
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
    cover_img: "https://media.istockphoto.com/id/1223154829/photo/blank-notebook-with-fresh-vegetables-herbs-legumes-and-nuts-top-view-veggie-cooking-concept.jpg?s=612x612&w=0&k=20&c=SyGpDemmC01ANERPULUPIoAtJOM2zbdc2yb4ayE2Xh4=",
    categories: [
      {
        name: "Breakfast",
        meals: [
          {
            name: "Tofu Scramble with Vegetables",
            ingredients: ["tofu", "vegetables", "spices"],
            nutrients: { protein: "20g", carbs: "15g", fat: "10g" },
            prep_time: 15,
            img: "https://images.unsplash.com/photo-1593898710828-935576df601d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2NyYW1ibGUlMjB3aXRoJTIwVmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D"
          },
          {
            name: "Chia Pudding with Fruit and Nuts",
            ingredients: ["chia seeds", "fruit", "nuts", "plant-based milk"],
            nutrients: { protein: "10g", carbs: "20g", fat: "8g" },
            prep_time: 5,
            img: "https://images.unsplash.com/photo-1619855328617-c20b7f0eefdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2hpYSUyMFB1ZGRpbmclMjB3aXRoJTIwRnJ1aXQlMjBhbmQlMjBOdXRzfGVufDB8fDB8fHww"
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
            img: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QmVhbiUyMEJ1cmdlciUyMG9uJTIwYSUyMFdob2xlJTIwd2hlYXQlMjBCdW58ZW58MHx8MHx8fDA%3D"
          },
          {
            name: "Lentil Soup with Whole-wheat Bread",
            ingredients: ["lentils", "vegetables", "whole-wheat bread"],
            nutrients: { protein: "15g", carbs: "25g", fat: "5g" },
            prep_time: 30,
            img: "https://images.unsplash.com/photo-1478749485505-2a903a729c63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TGVudGlsJTIwU291cCUyMHdpdGglMjBXaG9sZSUyMHdoZWF0JTIwQnJlYWR8ZW58MHx8MHx8fDA%3D"
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
            img: "https://images.unsplash.com/photo-1543826173-1beeb97525d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VmVnZXRhYmxlJTIwU3RpciUyMGZyeSUyMHdpdGglMjBCcm93biUyMFJpY2V8ZW58MHx8MHx8fDA%3D"
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
            img: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VG9mdSUyMFRhY29zJTIwd2l0aCUyMEFsbCUyMHRoZSUyMEZpeGluZ3N8ZW58MHx8MHx8fDA%3D"
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
            img: "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEh1bW11cyUyMHdpdGglMjBWZWdldGFibGVzfGVufDB8fDB8fHww"
          },
          {
            name: "Apple Slices with Almond Butter",
            ingredients: ["apple", "almond butter"],
            nutrients: { protein: "5g", carbs: "15g", fat: "8g" },
            prep_time: 5,
            img: "https://images.unsplash.com/photo-1601045569976-699bac2727ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXBwbGUlMjBTbGljZXMlMjB3aXRoJTIwQWxtb25kJTIwQnV0dGVyfGVufDB8fDB8fHww"
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
    cover_img: "https://media.istockphoto.com/id/1184919744/photo/products-with-low-glycemic-index.jpg?s=612x612&w=0&k=20&c=BWrOCqlgt8R11XOmJa6IreX9-akKO3q59BBv5BgNk6E=",
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
            img: "https://images.unsplash.com/photo-1546531537-180fe32a52ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U21va2VkJTIwU2FsbW9uJTIwd2l0aCUyMEF2b2NhZG8lMjBUb2FzdHxlbnwwfHwwfHx8MA%3D%3D"
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
            img: "https://images.unsplash.com/photo-1526893628193-76477eb4bc8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R3JlZWslMjBZb2d1cnQlMjB3aXRoJTIwRnJ1aXQlMjBhbmQlMjBHcmFub2xhfGVufDB8fDB8fHww"
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
            img: "https://images.unsplash.com/photo-1549413468-cd78edb7e75c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFR1bmElMjBTYWxhZCUyMFNhbmR3aWNoJTIwb24lMjBXaG9sZSUyMHdoZWF0JTIwQnJlYWR8ZW58MHx8MHx8fDA%3D"
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
            img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFNhbG1vbiUyMFNhbGFkJTIwd2l0aCUyME1peGVkJTIwR3JlZW5zfGVufDB8fDB8fHww"
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
            img: "https://images.unsplash.com/photo-1664288377740-1bec924cd622?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q29kJTIwd2l0aCUyMFJvYXN0ZWQlMjBWZWdldGFibGVzfGVufDB8fDB8fHww"
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
            img: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2hyaW1wJTIwU3RpciUyMGZyeSUyMFJpY2UlMjBhbmQlMjBWZWdldGFibGVzfGVufDB8fDB8fHww"
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
            img: "https://images.unsplash.com/photo-1611810174991-5cdd99a2c6b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RWRhbWFtZXxlbnwwfHwwfHx8MA%3D%3D"
          },
          {
            name: "Cottage Cheese with Fruit",
            ingredients: ["cottage cheese", "berries", "honey", "nuts"],
            nutrients: { protein: "15g", carbs: "10g", fat: "8g" },
            prep_time: 5,
            img: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q290dGFnZSUyMENoZWVzZSUyMHdpdGglMjBGcnVpdHxlbnwwfHwwfHx8MA%3D%3D"
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
    cover_img: "https://media.istockphoto.com/id/1089759056/photo/background-healthy-food-fresh-fruits-vegetables-fish-berries-and-cereals-healthy-food-diet.jpg?s=612x612&w=0&k=20&c=EiDNX-l2pzeiLYYVUcFNzqMf3kULfs5lyZtswjNA3wo=",
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
            img: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V2hvbGUlMjB3aGVhdCUyMFBhbmNha2VzJTIwd2l0aCUyMEZydWl0JTIwYW5kJTIwWW9ndXJ0fGVufDB8fDB8fHww"
          },
          {
            name: "Veggie Omelet with Spinach and Cheese",
            ingredients: ["eggs", "spinach", "cheese", "onion", "bell peppers"],
            nutrients: { protein: "15g", carbs: "10g", fat: "8g" },
            prep_time: 15,
            img: "https://images.unsplash.com/photo-1453078977505-10c3e375c2a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VmVnZ2llJTIwT21lbGV0JTIwd2l0aCUyMFNwaW5hY2glMjBhbmQlMjBDaGVlc2V8ZW58MHx8MHx8fDA%3D"
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
            img: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UXVpbm9hJTIwU2FsYWQlMjB3aXRoJTIwR3JpbGxlZCUyMFZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D"
          },
          {
            name: "Black Bean Soup with Whole-wheat Tortillas",
            ingredients: ["black beans", "vegetables", "whole-wheat tortillas"],
            nutrients: { protein: "15g", carbs: "30g", fat: "5g" },
            prep_time: 30,
            img: "https://images.unsplash.com/photo-1600626336477-96e4ee89a052?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QmVhbiUyMFNvdXAlMjB3aXRoJTIwV2hvbGUlMjB3aGVhdCUyMFRvcnRpbGxhc3xlbnwwfHwwfHx8MA%3D%3D"
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
            img: "https://images.unsplash.com/photo-1586197122509-651125c9605a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VmVnZXRhYmxlJTIwTGFzYWduYXxlbnwwfHwwfHx8MA%3D%3D"
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
            img: "https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q2hpbGklMjB3aXRoJTIwQ29ybmJyZWFkJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
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
            img: "https://images.unsplash.com/photo-1516100970402-530cfdf696d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q290dGFnZSUyMENoZWVzZSUyMHdpdGglMjBGcnVpdHxlbnwwfHwwfHx8MA%3D%3D"
          },
          {
            name: "Trail Mix",
            ingredients: ["nuts", "dried fruits", "seeds", "dark chocolate"],
            nutrients: { protein: "8g", carbs: "15g", fat: "10g" },
            prep_time: 5,
            img: "https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFRyYWlsJTIwTWl4JTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D"
          },
          // ... more snack options
        ],
      },
    ],
  },
];