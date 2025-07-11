import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Export trimester detailedRecipes for use in meal plan and other sections
export const trimesterRecipes = [
  {
    id: 1,
    name: "Spinach and Lentil Curry",
    time: "30 min",
    servings: 4,
    calories: 285,
    nutrients: [
      "Folate: 180mcg (45% DV)",
      "Iron: 6.2mg (34% DV)",
      "Protein: 14g",
      "Fiber: 8g",
      "Vitamin C: 28mg",
    ],
    ingredients: [
      "1 cup red lentils, rinsed and drained",
      "2 cups fresh spinach, chopped",
      "1 medium onion, diced",
      "3 cloves garlic, minced",
      "1 inch fresh ginger, grated",
      "1 can (14oz) coconut milk",
      "2 tbsp olive oil",
      "1 tsp cumin seeds",
      "1 tsp turmeric powder",
      "1 tsp coriander powder",
      "1/2 tsp red chili powder (optional)",
      "Salt to taste",
      "2 cups water or vegetable broth",
      "Fresh cilantro for garnish",
      "Lemon wedges for serving",
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat. Add cumin seeds and let them splutter for 30 seconds.",
      "Add diced onion and cook until translucent and lightly golden, about 5-6 minutes.",
      "Add minced garlic and grated ginger. Cook for 1 minute until fragrant.",
      "Add turmeric, coriander, and chili powder. Stir constantly for 30 seconds to toast the spices.",
      "Add rinsed lentils and water/broth. Bring to a boil, then reduce heat and simmer for 15-18 minutes.",
      "Stir in coconut milk and chopped spinach. Cook for 3-5 more minutes until spinach wilts completely.",
      "Season with salt and simmer until lentils are tender and curry reaches desired consistency.",
      "Remove from heat, garnish with fresh cilantro, and serve with lemon wedges.",
    ],
    description: "A folate and iron-rich curry perfect for the first trimester.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Medium",
    pregnancyBenefits:
      "Spinach is high in folate, which is crucial for fetal development, and iron, which helps prevent anemia. Lentils are a great source of protein and fiber, aiding in the healthy growth of the baby and helping to maintain maternal health.",
    tips: [
      "Soak lentils for a few hours to reduce cooking time and enhance digestibility.",
      "Adjust the consistency of the curry by adding more or less water/broth as per your preference.",
    ],
    safetyNotes: [
      "Ensure lentils are cooked thoroughly to avoid any digestive discomfort.",
      "Consult with a healthcare provider before adding new spices or herbs to your diet.",
    ],
  },
  {
    id: 2,
    name: "Fortified Cereal Bowl",
    time: "5 min",
    servings: 1,
    calories: 320,
    nutrients: [
      "Folate: 400mcg (100% DV)",
      "Iron: 18mg (100% DV)",
      "Vitamin B12: 6mcg",
      "Calcium: 300mg",
    ],
    ingredients: [
      "1 cup fortified whole grain cereal",
      "1 cup milk (dairy or fortified plant-based)",
      "1/2 cup fresh berries (strawberries, blueberries)",
      "1 tbsp chopped walnuts",
      "1 tsp honey (optional)",
      "1 tbsp ground flaxseed",
    ],
    instructions: [
      "Pour fortified cereal into a bowl.",
      "Add cold milk of your choice.",
      "Top with fresh berries and chopped walnuts.",
      "Sprinkle ground flaxseed on top.",
      "Drizzle with honey if desired.",
      "Serve immediately for best texture.",
    ],
    description: "A quick, folate-rich breakfast for early pregnancy.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Easy",
    pregnancyBenefits:
      "Fortified cereals are an excellent source of essential vitamins and minerals, including folate, which is crucial for preventing neural tube defects. The added iron helps support the increased blood volume during pregnancy, and calcium is vital for developing the baby's bones and teeth.",
    tips: [
      "Choose a cereal with no added sugar for a healthier option.",
      "You can add other fruits or nuts as per your preference and availability.",
    ],
    safetyNotes: [
      "Ensure the cereal is well-fortified; check the nutrition label.",
      "If using plant-based milk, ensure it is fortified with calcium and vitamin B12.",
    ],
  },
  {
    id: 4,
    name: "Bean and Vegetable Stew",
    time: "45 min",
    servings: 6,
    calories: 245,
    nutrients: [
      "Iron: 4.8mg (27% DV)",
      "Protein: 12g",
      "Fiber: 9g",
      "Folate: 120mcg",
      "Vitamin A: 8500 IU",
    ],
    ingredients: [
      "2 cups mixed beans (kidney, black, pinto), cooked",
      "2 cups diced tomatoes (canned or fresh)",
      "1 large carrot, diced",
      "2 celery stalks, diced",
      "1 bell pepper, diced",
      "1 medium onion, diced",
      "3 cloves garlic, minced",
      "2 tbsp olive oil",
      "4 cups vegetable broth",
      "2 tsp smoked paprika",
      "1 tsp cumin",
      "1 tsp oregano",
      "2 bay leaves",
      "Salt and pepper to taste",
      "2 cups fresh spinach",
      "Fresh parsley for garnish",
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat.",
      "Add onion, carrot, and celery. Cook for 5-7 minutes until softened.",
      "Add bell pepper and garlic. Cook for 2 more minutes.",
      "Add diced tomatoes, beans, and all spices. Stir well.",
      "Pour in vegetable broth and bring to a boil.",
      "Reduce heat and simmer for 25-30 minutes until vegetables are tender.",
      "Stir in fresh spinach and cook until wilted.",
      "Remove bay leaves, season with salt and pepper.",
      "Serve hot, garnished with fresh parsley.",
    ],
    description: "Iron-rich stew to help prevent pregnancy anemia.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Medium",
    pregnancyBenefits:
      "This stew is packed with iron-rich beans and vitamin A from the vegetables, supporting the increased nutritional needs during pregnancy. The high fiber content aids digestion and helps prevent constipation.",
    tips: [
      "Soak beans overnight to reduce cooking time and enhance digestibility.",
      "Add other vegetables as per your preference and seasonal availability.",
    ],
    safetyNotes: [
      "Ensure beans are cooked thoroughly to avoid any digestive discomfort.",
      "Consult with a healthcare provider before adding new spices or herbs to your diet.",
    ],
  },
  {
    id: 7,
    name: "Creamy Spinach Smoothie",
    time: "10 min",
    servings: 2,
    calories: 180,
    nutrients: [
      "Calcium: 450mg (45% DV)",
      "Folate: 140mcg",
      "Vitamin K: 180mcg",
      "Protein: 8g",
    ],
    ingredients: [
      "2 cups fresh spinach leaves",
      "1 cup milk (dairy or fortified almond milk)",
      "1/2 cup Greek yogurt",
      "1 frozen banana",
      "1/2 avocado",
      "1 tbsp almond butter",
      "1 tsp vanilla extract",
      "1 tbsp honey or maple syrup",
      "1/2 cup ice cubes",
      "1 tbsp chia seeds (optional)",
    ],
    instructions: [
      "Wash spinach leaves thoroughly and remove any tough stems.",
      "Add spinach and milk to blender first for easier blending.",
      "Add Greek yogurt, frozen banana, and avocado.",
      "Include almond butter, vanilla, and sweetener.",
      "Blend on high speed for 60-90 seconds until completely smooth.",
      "Add ice cubes and blend again until desired consistency.",
      "Pour into glasses and sprinkle with chia seeds if using.",
      "Serve immediately for best taste and nutrition.",
    ],
    description: "Calcium-rich smoothie for bone and teeth development.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Easy",
    pregnancyBenefits:
      "This smoothie is a great source of calcium, which is essential for the development of the baby's bones and teeth. The folate from spinach helps in the healthy growth of the baby, and the protein from yogurt and almond butter aids in tissue repair and growth.",
    tips: [
      "Use frozen banana and avocado for a creamier texture.",
      "Adjust the thickness of the smoothie by adding more or less milk.",
    ],
    safetyNotes: [
      "Ensure all ingredients are fresh and properly washed.",
      "Consult with a healthcare provider before adding new ingredients to your diet.",
    ],
  },
  {
    id: 10,
    name: "Herb-Roasted Chicken",
    time: "60 min",
    servings: 4,
    calories: 285,
    nutrients: [
      "Protein: 35g",
      "Iron: 2.1mg",
      "Vitamin B6: 0.8mg",
      "Niacin: 12mg",
      "Selenium: 24mcg",
    ],
    ingredients: [
      "4 chicken breasts (6 oz each), bone-in, skin-on",
      "2 tbsp olive oil",
      "2 tsp dried rosemary",
      "2 tsp dried thyme",
      "1 tsp garlic powder",
      "1 tsp onion powder",
      "1 tsp paprika",
      "1/2 tsp salt",
      "1/4 tsp black pepper",
      "2 lemons, sliced",
      "4 garlic cloves, crushed",
      "Fresh herbs for garnish",
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Pat chicken breasts dry with paper towels.",
      "Mix olive oil with all dried herbs and spices in a small bowl.",
      "Rub the herb mixture all over chicken, including under the skin.",
      "Place chicken in a roasting pan with lemon slices and garlic.",
      "Roast for 45-55 minutes until internal temperature reaches 165°F (74°C).",
      "Let rest for 5 minutes before serving.",
      "Garnish with fresh herbs and serve with roasted vegetables.",
    ],
    description: "High-protein meal for rapid growth in the second trimester.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Medium",
    pregnancyBenefits:
      "Chicken is a great source of lean protein, which is essential for the growth and development of the baby. The herbs used in this recipe not only add flavor but also provide various health benefits, including anti-inflammatory properties.",
    tips: [
      "For extra flavor, marinate the chicken in the herb mixture for a few hours or overnight.",
      "Serve with a side of steamed vegetables or a fresh salad for a complete meal.",
    ],
    safetyNotes: [
      "Ensure chicken is cooked thoroughly to avoid any foodborne illness.",
      "Consult with a healthcare provider before adding new herbs or spices to your diet.",
    ],
  },
  {
    id: 12,
    name: "Broccoli Aloo Curry",
    time: "30 min",
    servings: 4,
    calories: 210,
    nutrients: [
      "Vitamin C: 90mg (100% DV)",
      "Folate: 60mcg",
      "Fiber: 6g",
      "Potassium: 700mg",
      "Iron: 2.2mg",
    ],
    ingredients: [
      "1 cup broccoli florets, washed and cut",
      "1 medium potato, peeled and cubed",
      "1 small onion, finely chopped",
      "1 tsp garlic paste",
      "1 tsp ginger paste",
      "1/2 tsp turmeric powder",
      "1/2 tsp cumin seeds",
      "Salt to taste",
      "1 tbsp mustard oil or ghee",
      "1/2 tsp coriander powder",
      "1/4 cup water",
      "Chopped coriander leaves for garnish",
    ],
    instructions: [
      "Heat mustard oil in a pan and add cumin seeds until they splutter.",
      "Add chopped onion, garlic, and ginger paste and sauté until golden.",
      "Add turmeric and coriander powder; stir well.",
      "Add potato cubes and cook for 3–4 minutes.",
      "Add broccoli florets and salt; mix thoroughly.",
      "Add a little water, cover, and cook on low heat for 8–10 minutes.",
      "Check if vegetables are soft; cook uncovered for a few more minutes if needed.",
      "Garnish with fresh coriander leaves and serve hot.",
    ],
    description: "A nutritious curry combining broccoli and potatoes, rich in vitamin C, fiber, and folate—ideal for pregnancy.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Easy",
    category: "Main Course",
    trimester: 2,
    pregnancyBenefits:
      "Broccoli is high in vitamin C, folate, and fiber, supporting immune health and fetal development. Potatoes provide potassium and energy, making this curry a balanced meal for pregnancy.",
    tips: [
      "Cut potatoes into small cubes for faster cooking.",
      "Add a squeeze of lemon for extra flavor and vitamin C.",
    ],
    safetyNotes: [
      "Ensure all vegetables are washed thoroughly before cooking.",
      "Consult your healthcare provider before making major dietary changes.",
    ],
  },
  {
    id: 14,
    name: "Tisi ko Achar (Flaxseed Pickle)",
    time: "10 min prep + 4 hours chill",
    servings: 2,
    calories: 220,
    nutrients: [
      "Omega-3: 2.5g",
      "Fiber: 10g",
      "Calcium: 180mg",
      "Protein: 6g",
      "Iron: 1.6mg",
    ],
    ingredients: [
      "3 tbsp flaxseeds (dry roasted)",
      "1 tsp mustard oil",
      "Garlic, green chili, salt, lemon juice",
    ],
    instructions: [
      "Roast flaxseeds and grind coarsely.",
      "Mix with crushed garlic, chili, and salt.",
      "Add lemon juice and mustard oil.",
      "Store in a clean jar and let it rest before serving.",
    ],
    description:
      "Flaxseeds are an excellent plant-based source of Omega-3 fatty acids (ALA), which support the baby’s brain development and help reduce inflammation during pregnancy. They also provide fiber, aiding digestion and preventing constipation, a common issue in pregnancy. Tisi ko Achar is a flavorful and nutritious way to include these benefits in a traditional Nepali diet.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Easy",
    pregnancyBenefits:
      "Flaxseeds are rich in Omega-3 fatty acids, which are important for the baby's brain development. They also provide dietary fiber, which helps in maintaining digestive health and preventing constipation during pregnancy.",
    tips: [
      "Serve as a side with rice and lentils for a nutritious boost.",
      "Use as a spread on whole-grain bread or crackers.",
    ],
    safetyNotes: [
      "Consult with a healthcare provider before adding flaxseeds to your diet, especially in large amounts.",
    ],
  },
  {
    id: 16,
    name: "Rayo ko Saag (Mustard Greens)",
    time: "15 min",
    servings: 4,
    calories: 165,
    nutrients: [
      "Vitamin K: 684mcg (570% DV)",
      "Vitamin A: 10,300 IU",
      "Vitamin C: 134mg",
      "Folate: 19mcg",
      "Calcium: 90mg",
    ],
    ingredients: [
      "2 cups finely chopped mustard greens (rayo ko saag)",
      "1 tsp garlic paste or crushed garlic",
      "1/2 tsp turmeric powder",
      "1 tbsp mustard oil",
      "1/4 tsp fenugreek seeds (methi)",
      "Salt to taste",
      "1/4 cup water",
    ],
    instructions: [
      "Wash and chop mustard greens thoroughly.",
      "Heat mustard oil in a pan and add fenugreek seeds until they turn dark.",
      "Add garlic paste and sauté until fragrant.",
      "Add chopped mustard greens and turmeric powder.",
      "Add salt and a splash of water to help cook the greens.",
      "Cover and cook on low heat for 5–7 minutes, stirring occasionally.",
      "Uncover and cook until the water evaporates and greens are tender.",
      "Serve hot with rice, dhindo, or roti.",
    ],
    description:
      "Mustard greens are very high in Vitamin K which supports blood clotting and reduces risk of bleeding.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Easy",
    pregnancyBenefits:
      "Mustard greens are an excellent source of Vitamin K, which is important for blood clotting and bone health. They also provide calcium and folate, which are essential for the development of the baby's bones and prevention of neural tube defects.",
    tips: [
      "Pair with a protein source like lentils or beans for a balanced meal.",
      "Can be served as a side dish or mixed into main dishes like rice or pasta.",
    ],
    safetyNotes: [
      "Consult with a healthcare provider before adding large amounts of mustard greens to your diet, especially if you have thyroid issues.",
    ],
  },
  {
    id: 18,
    name: "Bhatmas Sadeko (Roasted Soybean Salad)",
    time: "20 min",
    servings: 2,
    calories: 180,
    nutrients: [
      "Protein: 14g",
      "Fiber: 6g",
      "Iron: 2.5mg",
      "Vitamin C: 10mg",
    ],
    ingredients: [
      "1 cup roasted soybeans (bhatmas)",
      "1 small onion, finely chopped",
      "1 tomato, chopped",
      "1 green chili, finely chopped (optional)",
      "1 tsp mustard oil",
      "1 tsp lemon juice",
      "Salt to taste",
      "Chopped coriander leaves for garnish",
    ],
    instructions: [
      "Dry roast soybeans in a pan until crisp and aromatic.",
      "Allow the soybeans to cool slightly before mixing.",
      "Combine roasted soybeans with chopped onion, tomato, and green chili.",
      "Add mustard oil, lemon juice, and salt to taste.",
      "Toss all ingredients well until evenly mixed.",
      "Garnish with fresh coriander leaves and serve immediately.",
    ],
    description: "A protein- and fiber-rich Nepali salad, perfect for a healthy pregnancy snack.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Easy",
    pregnancyBenefits:
      "Soybeans provide plant-based protein that supports fetal growth and maternal tissue repair. They are also rich in iron, which is important for preventing anemia during pregnancy.",
    tips: [
      "Use freshly roasted soybeans for the best crunch and flavor.",
      "Adjust lemon and chili based on your taste preference.",
    ],
    safetyNotes: [
      "Ensure soybeans are well-roasted to avoid hardness that can cause bloating.",
    ],
  },
  {
    id: 15,
    name: "Masu Jhol (Nepali Fish Curry)",
    time: "25 min",
    servings: 4,
    calories: 260,
    nutrients: [
      "Protein: 22g",
      "Omega-3: 1.2g",
      "Vitamin D: 8mcg",
      "Iron: 1.8mg",
    ],
    ingredients: [
      "4 pieces of Rahu or salmon fish",
      "1 medium onion, finely chopped",
      "1 tomato, chopped",
      "1 tbsp garlic paste",
      "1 tsp ginger paste",
      "1 tsp turmeric powder",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "Salt to taste",
      "2 tbsp mustard oil",
      "1/2 tsp fenugreek seeds",
      "1.5 cups water",
      "Fresh coriander leaves for garnish",
    ],
    instructions: [
      "Marinate the fish with salt and turmeric powder for 10 minutes.",
      "Heat mustard oil in a pan and lightly fry the fish pieces until golden brown; remove and set aside.",
      "In the same oil, fry fenugreek seeds until they turn dark brown.",
      "Add chopped onion, garlic, and ginger paste; sauté until golden.",
      "Add chopped tomatoes and cook until soft and blended.",
      "Stir in turmeric, cumin, coriander powder, and salt; cook for 2–3 minutes.",
      "Add water and let the gravy simmer.",
      "Gently add fried fish into the curry and cook for 8–10 minutes on low heat.",
      "Garnish with fresh coriander leaves before serving.",
    ],
    description: "A classic Nepali fish curry rich in protein and omega-3, ideal for the third trimester.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Medium",
    pregnancyBenefits:
      "Fish is an excellent source of high-quality protein and omega-3 fatty acids, which are important for the baby's brain development. This curry also provides essential vitamins and minerals from the spices and herbs used.",
    tips: [
      "Serve with a side of steamed rice or quinoa for a complete meal.",
      "Adjust the spice levels according to your preference.",
    ],
    safetyNotes: [
      "Ensure fish is cooked thoroughly to avoid any foodborne illness.",
      "Consult with a healthcare provider before adding new herbs or spices to your diet.",
    ],
  },
  {
    id: 13,
    name: "Okhar Ra Chaku Laddu (Walnut & Molasses Ball)",
    time: "25 min",
    servings: 6,
    calories: 210,
    nutrients: [
      "Omega-3: 2g",
      "Protein: 4g",
      "Magnesium: 40mg",
      "Iron: 1mg",
    ],
    ingredients: [
      "1 cup walnuts, chopped",
      "½ cup chaku (molasses) or jaggery if chaku is unavailable",
      "1 pinch cardamom powder (optional, for aroma)",
      "1 tsp ghee (optional, for softness)",
    ],
    instructions: [
      "Roast walnuts lightly in a pan for 2–3 minutes until aromatic.",
      "Melt chaku (molasses) on low heat until it becomes slightly runny; avoid overheating.",
      "Mix roasted walnuts into the melted chaku and stir until evenly coated.",
      "Add cardamom powder and a small amount of ghee for added flavor and softness (optional).",
      "Let the mixture cool slightly, then form into small balls using greased hands.",
      "Store the laddus in an airtight container; refrigerate if needed.",
    ],
    description: "A traditional Nepali sweet packed with omega-3, iron, and energy for pregnancy.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Easy",
    pregnancyBenefits:
      "Walnuts are rich in omega-3 fatty acids, which are important for the baby's brain development. Molasses is a good source of iron and calcium, which are essential for preventing anemia and supporting bone health during pregnancy.",
    tips: [
      "Consume in moderation as part of a balanced diet.",
      "Can be taken as a quick energy-boosting snack.",
    ],
    safetyNotes: [
      "Consult with a healthcare provider before adding new ingredients to your diet, especially if you have allergies or dietary restrictions.",
    ],
  },
  {
    id: 17,
    name: "Broccoli Aloo Curry",
    time: "30 min",
    servings: 4,
    calories: 120,
    nutrients: ["Vitamin K: 195mcg", "Vitamin C: 85mg", "Folate: 60mcg", "Fiber: 4g"],
    ingredients: [
      "1 cup broccoli florets, washed and cut",
      "1 medium potato, peeled and cubed",
      "1 small onion, finely chopped",
      "1 tsp garlic paste",
      "1 tsp ginger paste",
      "1/2 tsp turmeric powder",
      "1/2 tsp cumin seeds",
      "Salt to taste",
      "1 tbsp mustard oil or ghee",
      "1/2 tsp coriander powder",
      "1/4 cup water",
      "Chopped coriander leaves for garnish",
    ],
    instructions: [
      "Heat mustard oil in a pan and add cumin seeds until they splutter.",
      "Add chopped onion, garlic, and ginger paste and sauté until golden.",
      "Add turmeric and coriander powder; stir well.",
      "Add potato cubes and cook for 3–4 minutes.",
      "Add broccoli florets and salt; mix thoroughly.",
      "Add a little water, cover, and cook on low heat for 8–10 minutes.",
      "Check if vegetables are soft; cook uncovered for a few more minutes if needed.",
      "Garnish with fresh coriander leaves and serve hot.",
    ],
    description: "Broccoli is rich in Vitamin K, essential for proper blood clotting and bone health.",
    image: "/placeholder.svg?height=300&width=400",
    difficulty: "Easy",
    pregnancyBenefits: "Broccoli is rich in Vitamin K, essential for proper blood clotting and bone health.",
    tips: [
      "Do not overcook broccoli to retain its nutrients and texture.",
      "Add a squeeze of lemon juice after cooking for better taste and iron absorption.",
    ],
    safetyNotes: [
      "Wash broccoli thoroughly to remove pesticides and dirt.",
      "Cook until tender to make it easier to digest during pregnancy.",
    ],
    category: "Main Course",
    trimester: 3,
  },
  // ...add more recipes as needed from detailedRecipes...
];
