"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageCircle,
  BookmarkPlus,
  ChefHat,
  Clock,
  Users,
  Flame,
  Star,
  CheckCircle,
  Lightbulb,
  Baby,
} from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useSubscription } from "@/components/subscription-provider"

const trimesterData = {
  "1": {
    title: "First Trimester Nutrition",
    weeks: "1-12 weeks",
    description: "Essential nutrients for early pregnancy development",
    nutrients: [
      {
        name: "Folic Acid",
        importance: "Supports baby's brain and spinal cord development",
        dailyAmount: "400-600 mcg/day",
        foods: ["Spinach", "Lentils", "Kidney", "Maize"],
        recipes: [

          { id: 1, name: "Rayo Ko Saag with Dhido", time: "30 min", likes: 45, premium: false },
          { id: 2, name: "Chana Tarkari (Chickpeas Curry)", time: "5 min",premium: false },
          { id: 3, name: "Stuffed Rayo Ko Saag Paratha(Flatbread with Mustard Greens Filling)", difficulty: "", time: "25 min", premium: true },
        ],
      },
      {
        name: "Iron",
        importance: "Prevents anemia and supports blood production",
        dailyAmount: "27 mg / day",
        foods: ["Red meat", "Beans", "Tofu", "Dry Fruits"],
        recipes: [


          { id: 4, name: "Kidney Bean Curry(Rajma Tarkari)", time: "45 min", premium: false },
          { id: 5, name: "Spiced Tofu Salad (Tofu Sadeko)", time: "20 min", premium: false },
          { id: 6, name: "Sidra Fish Curry with Gundruk", time: "15 min", premium: true },
        ],
      },
    ],
  },
  "2": {
    title: "Second Trimester Nutrition",
    weeks: "13-26 weeks",
    description: "Supporting rapid growth and development",
    nutrients: [
      {
        name: "Calcium",
        importance: "Prevents calcium loss from the mother’s bones",
        dailyAmount: "1000 mg / day ",
        foods: ["Dairy products", "Leafy greens", "Almonds"],
        recipes: [
          { id: 7, name: "Tofu Momo (Calcium-Rich Veg Momo)", time: "10 min", likes: 78, premium: false },
          { id: 8, name: "Kheer (Rice Pudding)", time: "35 min", premium: true },
          { id: 9, name: " Khuwa Dudh Barfi (Milk-Based Sweet Barfi)", difficulty: "Easy", time: "20 min",premium: true },
        ],
      },
      {
        name: "Protein",
        importance: "Essential for baby’s muscles, brain, and tissue development.",
        dailyAmount: "75-100g / day",
        foods: ["Chicken", "Fish", "Eggs", "Milk"],
        recipes: [

          { id: 10, name: "Egg Curry", time: "60 min",premium: false },
          { id: 11, name: "Paneer Palungo Tarkari (Paneer Spinach Curry)", time: "5 min", premium: false },
          { id: 12, name: "Besan Chilla (Gram Flour Pancake)", time: "30 min", premium: true },
        ],
      },
    ],
  },
  "3": {
    title: "Third Trimester Nutrition",
    weeks: "27-40 weeks",
    description: "Preparing for delivery and final growth phase",
    nutrients: [
      {
        name: "Omega-3 Fatty Acids",
        importance: "Brain and eye development",
        dailyAmount: "200-300 mg DHA",
        foods: ["Salmon", "Walnuts", "Green Leafy Vegetables", "Flaxseeds"],
        recipes: [
          { id: 13, name: "Okhar Ra Chaku Laddu (Walnut & Molasses Ball)", time: "25 min", premium: true },
          { id: 14, name: "Tisi ko Achar (Flaxseed Pickle)", time: "10 min", premium: false },
          { id: 15, name: "Masu Jhol (Nepali Fish Curry)", time: "25 min", premium: false },
        ],
      },
      {
        name: "Vitamin K",
        importance: "Blood clotting and bone health",
        dailyAmount: "90 mcg",
        foods: ["Mustard Greens", "Broccoli", "Radish Greens", "Soybean"],
        recipes: [
          { id: 16, name: "Rayo ko Saag (Mustard Greens)", time: "15 min", premium: false },
          { id: 17, name: "Broccoli Aloo Curry", time: "30 min", premium: false },
          { id: 18, name: "Bhatmas Sadeko (Roasted Soybean Salad)", time: "20 min", premium: true },
        ],
      },
    ],
  },
}

const detailedRecipes = {
  1: {
    name: "Rayo Ko Saag with Dhido",
    difficulty: "Easy",
    time: "30 min",
    servings: 1,
    calories: 250,
    nutrients: [
      "Folic Acid :170–230 mcg",
      "Iron:\t3–4 mg",
      "Calcium:\t150–200 mg ",
      "Fiber: \t4–5 grams"
    ],
    ingredients: [
      "2 cups rayo ko saag (mustard greens), washed and chopped",
      "1 tbsp mustard oil",
      "2 cloves garlic, minced",
      "3 cloves garlic, minced",
      "1 small green chili (optional), chopped",
      "½ tsp turmeric powder",
      "1 cup millet flour (or buckwheat/sorghum flour)",
      "3 cups water",
      "Salt to taste"
    ],
    instructions: [
      "Start the saag: Heat mustard oil in a pan over medium heat. Add minced garlic and green chili; sauté until fragrant.",
      "Add chopped rayo ko saag and turmeric powder. Stir well, then add salt and about ¼ cup water. Cover and simmer on low heat for 10–15 minutes until the greens are tender. Stir occasionally and add water if needed to prevent drying.",
      "Prepare the Dhido: While the saag is cooking, bring 3 cups water to a boil in a heavy-bottomed pan with a pinch of salt.",
      "Gradually add millet flour to the boiling water while stirring continuously with a wooden spatula to avoid lumps.",
      "Reduce heat to low and keep stirring until the mixture thickens to a smooth, dough-like consistency. Cook for 5–7 minutes, stirring occasionally.",
      "Serve the hot Rayo ko Saag alongside the freshly made Dhido, shaping the dhido into small balls or servings on the plate"
    ],
    tips: [     
"Wash thoroughly to remove any dirt or pesticides",
"Cook well to improve iron absorption and digestion",
"Pair with lemon or tomato to boost vitamin C for better iron absorption",
"Avoid overcooking to preserve nutrients",
"Consume in moderation if you have thyroid issues due to goitrogens"

    ],
    pregnancyBenefits:
    "Rayo ko saag is rich in folate, calcium, iron, and vitamin K, which support fetal neural development, help in blood formation, strengthen bones, and reduce the risk of birth defects, making it a healthy choice during pregnancy.",
    safetyNotes: [
      "Wash and cook mustard greens thoroughly to avoid harmful bacteria.",
      "Use mustard oil moderately or substitute with milder oils if preferred.",
      "Avoid too much chili to prevent digestive discomfort during pregnancy."
    ]
  },
  2: {

    name: "Chana Tarkari (Chickpeas Curry)",
    difficulty: "Easy",
    time: "20 min",
    servings: 1,
    calories: 320,
    nutrients: ["Folate: 200-280 mcg", "Iron: 4-5 mg", "Protein: 14-15 g", "Calcium: 80-100 mg"],
    ingredients: [
      "½ cup boiled chickpeas (about 75g)",
      "½ small onion, finely chopped",
      "1 small tomato, chopped or pureed",
      "½ tsp garlic paste",
      "½ tsp ginger paste",
      "¼ tsp turmeric powder",
      "½ tsp cumin powder",
      "Pinch of coriander powder",
      "Salt to taste",
      "1 tsp oil (mustard or other)",
      "½ cup water",
      "Fresh coriander to garnish",
    ],
    instructions: [
      "Heat oil in a small pan. Add onion and saute until golden.",
      "Add ginger & garlic paste, cook for 30 seconds.",
      "Add turmeric, cumin, coriander, salt, and tomato. Cook until soft.",
      "Stir in boiled chickpeas and water. Simmer for 10 minutes.",
      "Garnish with coriander and serve warm with 1 roti or ½ cup rice.",
    ],
    tips: [
      "Soak chickpeas overnight before boiling – this improves digestion and nutrient absorption.",
      "Pair with vitamin C-rich food (like lemon or tomato) to boost iron absorption.",
    ],
    pregnancyBenefits:
      "Chickpeas curry is highly beneficial during pregnancy as it provides essential nutrients like protein for your baby’s growth, folic acid to support brain and spinal development, and iron to prevent anemia. Its high fiber content also helps relieve constipation, making it a nourishing and digestion-friendly meal for expecting mothers.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use clean, fresh ingredients and cook well to avoid contamination.",],
  },
  4: {

    name: "Kidney Bean Curry(Rajma Tarkari)",
    difficulty: "Easy",
    time: "45 min",
    servings: 1,
    calories: 245,
    nutrients: ["Iron: 4.8mg", "Protein: 18 g", "Fiber: 9g", "Folate: 200 mcg", "Magnesium: 50 mg"],
    ingredients: [
      "1 cup boiled kidney beans (rajma)",
      "1 medium onion, chopped",
      "2 medium tomatoes, chopped or pureed",
      "1 tsp garlic paste",
      "1 tsp ginger paste",
      "½ tsp turmeric powder",
      "1 tsp cumin powder",
      "½ tsp coriander powder",
      "Salt to taste",
      "1 tbsp mustard oil (or vegetable oil)",
      "1½ cups water",
      "Optional: green chili, fresh coriander for garnish"
     
    ],
    instructions: [
      "If using dried rajma, soak overnight and boil until soft. If using canned, rinse well.",
      "Heat oil in a pan. Add onions and sauté till golden. Add garlic and ginger paste; cook 1 minute.",
      "Add turmeric, cumin, coriander, and tomatoes. Cook until soft and oil separates.",
      "Mix in boiled kidney beans, add water, and simmer for 10–15 minutes. Mash a few beans to thicken curry.",
      "Add fresh coriander and serve with brown rice or roti.",
    ],
    tips: [
      "Soak dried rajma overnight to improve digestibility.",
      "Add lemon juice or pair with tomatoes to boost iron absorption.",
      "Use brown rice for extra fiber and nutrients.",
    ],
    pregnancyBenefits:
      "Kidney bean curry is an excellent iron-rich meal for pregnancy, helping to prevent anemia and support healthy blood formation for both mother and baby. The iron from rajma, combined with vitamin C-rich tomatoes in the curry, boosts absorption and ensures a steady oxygen supply — essential for your baby’s growth and development.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Cook beans thoroughly to eliminate toxins and ease digestion."],
  },
  7: {

    name: "Tofu Momo (calcium-rich veg momo)",
    difficulty: "Easy",
    time: "15 min",
    servings: 2,
    calories: 200,
    nutrients: [
      "Iron: 3–4 mg",
      "Protein: 8–10 g",
      "Calcium: 120–180 mg",
      "Vitamin C: 6–8 mg",
      "Fiber: 2–3 g",
      ],

    ingredients: [
      "200 gm firm tofu, crumbled",
      "1 cup finely chopped cabbage",
      "1/2 cup finely chopped onion",
      "1/4 cup chopped spring onion",
      "1 tbsp minced garlic",
      "1 tbsp grated ginger",
      "1–2 green chilies, finely chopped (optional)",
      "1 tbsp soy sauce",
      "1/2 tsp turmeric powder",
      "Salt and pepper to taste",
      "Momo wrappers (or homemade dough)",
    ],

    instructions: [
      "Mix crumbled tofu, cabbage, onion, spring onion, garlic, ginger, and spices in a bowl",
      "Add soy sauce, salt, and pepper, and mix well to make the filling",
      "Place a spoonful of filling in each momo wrapper and fold to seal",
      "Steam the momos for 10–12 minutes until cooked through",
      "Serve hot with tomato achar or dipping sauce",
    ],

    tips: [
      "Drain tofu well to prevent watery filling",
      "Use fresh veggies for better texture",
      "Seal momos tightly to avoid breaking while steaming",
    ],
    pregnancyBenefits:
      "Tofu momos are a nutritious, iron- and protein-rich snack ideal for pregnancy. They support fetal growth and help prevent anemia, while calcium from tofu aids in the baby’s bone development. When steamed and made with fresh, mild ingredients, they’re a light and healthy choice for expecting mothers.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Ensure all vegetables and tofu are fresh and properly washed",
    "Steam thoroughly to avoid undercooked filling",],
  },
  10: {

    name: "Egg Curry",
    difficulty: "Medium",

    time: "60 min",
    servings: 2,
    calories: 250,
    nutrients: [
      "Iron: 2 mg",
      "Protein: 12–14 g (per egg)",
      "Calcium: 50–60 mg",
      "Vitamin B12: High",
      "Healthy fats: 10–12 g",],
    ingredients: [
      "4 boiled eggs, peeled",
      "2 medium onions, finely chopped",
      "2 tomatoes, chopped",
      "1 tbsp ginger-garlic paste",
      "2 green chilies, slit",
      "1 tsp turmeric powder",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "1/2 tsp red chili powder",
      "1/2 tsp garam masala",
      "Salt to taste",
      "2 tbsp oil",
      "1 cup water",
    ],
    instructions: [
      "Heat oil in a pan and lightly fry boiled eggs until golden, set aside",
      "In the same pan, sauté onions until golden brown",
      "Add ginger-garlic paste and cook until aromatic",
      "Add tomatoes, cook until soft and oil separates",
      "Add turmeric, cumin, coriander, chili powder, and salt, mix well",
      "Pour water to make the curry, bring to a boil",
      "Add fried eggs and simmer for 5–7 minutes",
      "Sprinkle garam masala and garnish with chopped cilantro",
      "Serve hot with rice or roti",
    ],
    tips: [
      "Prick the eggs with a fork before frying to let flavors soak in",
      "Use ripe tomatoes for a richer curry base",
    ],
    pregnancyBenefits:
      "Egg curry is a nutritious choice for pregnant women, offering high-quality protein, iron, and vitamin B12, which support fetal brain development and help prevent anemia. When prepared with moderate spices and healthy ingredients, it’s a hearty and safe option for expecting mothers.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: [
      "Use fresh, properly cooked eggs to avoid salmonella",
      "Wash hands thoroughly after handling eggshells",
    ],
  },
  14: {
    name: "Tisi ko Achar (Flaxseed Pickle)",
    time: "10 min prep + 4 hours chill",
    servings: 2,
    calories: 220,
    nutrients: ["Omega-3: 2.5g", "Fiber: 10g", "Calcium: 180mg", "Protein: 6g", "Iron: 1.6mg"],
    ingredients: [
      "3 tbsp flaxseeds (dry roasted)",
      "1 tsp mustard oil",
      "Garlic, green chili, salt, lemon juice",
    ],
    instructions: [
      "Roast flaxseeds and grind coarsely.",
"Mix with crushed garlic, chili, and salt.",
"Add lemon juice and mustard oil.",
"Store in a clean jar and let it rest before serving."
    ],
    tips: [
      "Consume in moderation—1–2 teaspoons per day is enough.",
"Always use freshly roasted and ground flaxseeds to retain nutrients.",
"Store in a cool, dry place in a clean jar to avoid spoilage.",
"Best consumed with rice or roti as a side dish.",
"Drink plenty of water, as flaxseeds are high in fiber.",
    ],
    pregnancyBenefits:
      "Flaxseeds are an excellent plant-based source of Omega-3 fatty acids (ALA), which support the baby’s brain development and help reduce inflammation during pregnancy. They also provide fiber, aiding digestion and preventing constipation, a common issue in pregnancy. Tisi ko Achar is a flavorful and nutritious way to include these benefits in a traditional Nepali diet.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: [
     "Do not consume in large quantities as excess flaxseed may affect hormone balance.",
"Avoid if you have a flaxseed allergy or digestive issues.",
    ],
  },
  16: {
    name: " Rayo ko Saag",
    time: "15 min",
    servings: 4,
    calories: 200,
    nutrients: [
      "Iron: 3–4 mg",
      "Protein: 8–10 g",
      "Calcium: 120–180 mg",
      "Vitamin C: 6–8 mg",
      "Fiber: 2–3 g",
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

    tips: [

      "Use fresh and tender mustard greens for better taste and nutrient retention.",
"Don’t overcook to preserve color, texture, and Vitamin K content.",
    ],
    pregnancyBenefits:
      "Mustard greens are very high in Vitamin K which supports blood clotting and reduces risk of bleeding.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Wash greens thoroughly to remove dirt and pesticide residues.",
"Avoid eating raw or undercooked mustard greens during pregnancy.",],
  },
  
  3: {
    name: "Stuffed Rayo Ko Saag Paratha(Flatbread with Mustard Greens Filling)",
    difficulty: "Medium",

    time: "25 min",
    servings: 1,
    calories: 220,
    nutrients: ["Folate:100-120 mcg", "Protein: 5-6 g", "Fiber: 4g", "Iron: 2-3 mg"],
    ingredients: [
      "1 cup whole wheat flour (atta)",
      "1 cup rayo ko saag (mustard greens), finely chopped",
      "1 small onion, finely chopped",
      "1 clove garlic, minced",
      "½ tsp cumin seeds",
      "¼ tsp turmeric powder",
      "Salt to taste",
      "Water as needed for dough",
    ],
    instructions: [
      "Make Dough – Mix wheat flour, salt, and water; knead into soft dough and rest.",
      "Prepare Filling – Sauté cumin, garlic, onion, and chopped rayo ko saag with turmeric and salt until dr",
      "Stuff & Roll – Roll dough, add filling in center, seal edges, and flatten gently.",
      "Combine quinoa, asparagus, pine nuts, and cranberries in a large bowl.",
      "Cook Paratha – Cook on a hot pan until golden brown on both sides with a little oil.",
      "Serve Hot – Enjoy with yogurt or chutney for a nutritious meal.",
    ],
    tips: [
      "Chop the greens finely and cook thoroughly to avoid moisture in stuffing.",
      "Serve with plain yogurt for added calcium and protein.",
      "Ideal for breakfast, lunch, or a light dinner.",
    ],
    pregnancyBenefits:
      "Stuffed Rayo ko Saag Paratha is highly beneficial during pregnancy as it provides iron and folic acid from mustard greens to support blood formation and prevent neural tube defects. The whole wheat flour adds fiber for smooth digestion, while the paratha also offers calcium and energy to support both mother and baby’s growth. It’s a wholesome, tasty way to include essential nutrients in a single meal.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Wash mustard greens thoroughly to remove dirt and pesticides", "Cook greens properly to kill any harmful microbes."],
  },

  5: {

    name: "Spiced Tofu Salad (Tofu Sadeko)",
    difficulty: "Easy",

    time: "20 min",
    servings: 1,
    calories: 220,
    nutrients: ["Iron: 3.5 mg","Protein: 10-12 grams","Calcium: 150-200 mg",
    ],
    ingredients: [
      "250 gm firm tofu, cubed and pan-fried",
      "1 small onion, finely chopped",
      "1-2 green chilies, finely chopped",
      "1 tbsp mustard oil",
      "1 tbsp lemon juice",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "1/2 tsp turmeric powder",
      "1/2 tsp chili powder",
      "Salt to taste",
      "Fresh cilantro (coriander leaves), chopped"
    ],

    instructions: [
      "Heat mustard oil in a pan until it starts to smoke slightly.",
      "Add finely chopped onions and green chilies, sauté until onions turn translucent.",
      "Add cumin powder, coriander powder, turmeric powder, chili powder, and salt. Stir well.",
      "Add the pan-fried tofu cubes and mix gently to coat them with the spices.",
      "Cook for 2-3 minutes on medium heat, allowing tofu to absorb the flavors.",
      "Turn off the heat and add lemon juice; mix well.",
      "Garnish with freshly chopped cilantro.",
      "Serve immediately as a salad or side dish."
    ],

    tips: [
      "Press tofu well for better texture",
      "Keep vegetables crisp for maximum nutrition",
      "Add cashews for extra protein and healthy fats",
    ],
    pregnancyBenefits:
      "Tofu provides plant-based protein and iron, essential during pregnancy. The colorful vegetables add vitamins and antioxidants for both mom and baby.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use pasteurized tofu", "Wash all vegetables thoroughly",],
  },

  6: {


    name: "Sidra Fish Curry with Gundruk",
    difficulty: "Easy",
    time: "30 min",
    servings: 1,
    calories: 280,
    nutrients: [
      "Protein: 25-30 grams (from fish)",
      "Iron: 4 mg (from Gundruk and fish)",
      "Omega-3 fatty acids: High (from fish)",
      "Calcium: 100-150 mg",
    ],

    ingredients:[
      "200 gm Sidra fish (or any freshwater fish), cleaned and cut into pieces",
      "1 cup Gundruk (fermented leafy greens), washed and chopped",
      "2 medium onions, finely chopped",
      "2 tomatoes, chopped",
      "2-3 cloves garlic, minced",
      "1-inch piece ginger, grated",
      "2 green chilies, slit",
      "2 tbsp mustard oil",
      "1 tsp turmeric powder",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "1 tsp red chili powder",
      "Salt to taste",
      "1 cup water",

    ],

    instructions: [
      "Heat mustard oil in a pot until it starts smoking.",
      "Add chopped onions, garlic, and ginger. Sauté until onions are golden brown.",
      "Add turmeric, cumin, coriander, and red chili powder. Stir for a minute to release the aroma.",
      "Add chopped tomatoes and cook until soft and oil separates.",
      "Add the fish pieces and salt. Cook gently for 5 minutes.",
      "Add chopped Gundruk and mix well.",
      "Pour in water and bring to a boil. Reduce heat and simmer for 15-20 minutes until fish is cooked and flavors meld.",
      "Adjust salt and spice levels as needed.",
    ],
    tips: [
      "Soak Gundruk in warm water for 10–15 minutes if it's too dry or sour.",
      "Use mustard oil for authentic Nepali flavor, but heat it until it smokes slightly to reduce its pungency."
    ],

    pregnancyBenefits:
      "Sidra Fish Curry with Gundruk is great for pregnancy because it’s rich in iron, helping prevent anemia. It provides protein and omega-3s for the baby’s growth and brain development. The dish also supplies vitamin A and calcium for immune health and strong bones, while healthy fats from mustard oil support overall maternal wellbeing.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes:[
      "Ensure the fish is fresh and properly cleaned to avoid foodborne illnesses.",
      "Cook the fish thoroughly to eliminate harmful bacteria and parasites.",
      "Limit intake of large fish species to reduce exposure to mercury; Sidra is generally safe in moderation.",
      "Store Gundruk properly to prevent spoilage and food contamination."
    ],

  },

  8: {

    name: "Kheer (Rice Pudding)",
    difficulty: "Medium",

    time: "35 min",
    servings: 1,
    calories: 280,
    nutrients: [
      "Calcium: 250-300 mg (from milk and nuts)",
      "Protein: 7-8 grams",
      "Calories: 200-250 kcal",
      "Carbohydrates: 30-35 grams",
      "Fat: 8-10 grams"
    ],

    ingredients: [
      "1 liter full-fat milk",
      "1/4 cup rice (preferably basmati), washed and soaked for 30 minutes",
      "1/4 cup sugar (adjust to taste)",
      "2-3 green cardamom pods, crushed",
      "2 tbsp chopped almonds",
      "2 tbsp chopped cashews",
      "1 tbsp raisins",
    
    ],
    instructions:[
      "Boil milk in a heavy-bottomed pan, stirring occasionally to avoid burning.",
      "Add soaked rice and cook on low heat, stirring regularly until rice is soft and the mixture thickens.",
      "Add sugar and crushed cardamom pods; mix well.",
      "Add chopped nuts, raisins, and saffron if using. Cook for a few more minutes.",
      "Turn off heat once the kheer reaches a creamy consistency.",
      "Serve warm or chilled, garnished with more nuts if desired."
    ],

    tips:[
      "Use full-fat milk for a richer texture and higher calcium content.",
      "Stir continuously after adding rice to prevent sticking.",
    ],

    pregnancyBenefits:
      "Kheer is a healthy pregnancy dessert rich in calcium and protein for the baby’s bone and tissue development. Nuts add iron and healthy fats, making it a nourishing and energy-boosting treat.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: [
      "Use pasteurized milk to avoid risk of infection during pregnancy.",
      "Avoid overconsumption if diabetic or monitoring sugar intake.",
    ],
 },

  9: {

    name: "Khuwa Dudh Barfi (Milk-Based Sweet Barfi)",
    difficulty: "Easy",

    time: "20 min",
    servings: 2,
    calories: 220,
    nutrients: ["Calcium: 200–250 mg","Protein: 6–8 g","Iron: 1–1.5 mg","Fat: 10–12 g",],
    ingredients: [
      "1 cup khuwa (mawa)",
      "1/2 cup full-fat milk",
      "1/4 cup sugar (adjust to taste)",
      "1/4 tsp cardamom powder",
      "2 tbsp chopped almonds and pistachios",
      "1 tsp ghee (clarified butter)",
      "A few saffron strands (optional)",
    ],
    instructions: [
      "Heat ghee in a nonstick pan on low heat",
      "Add khuwa and stir for 2–3 minutes until it softens",
      "Add milk and cook while stirring continuously to avoid lumps",
      "Add sugar and mix well; cook until the mixture thickens",
      "Stir in cardamom powder and saffron if using",
      "Cook until mixture leaves the sides of the pan and forms a soft dough",
      "Transfer to a greased tray and flatten evenly",
      "Garnish with chopped nuts and press gently",
      "Let it cool and set for 1–2 hours, then cut into squares",
    ],
    tips: [
      "Use fresh khuwa for best texture and flavor",
      "Stir continuously to prevent sticking or burning",
      "Adjust sugar to taste; less for a healthier version",
    ],
    pregnancyBenefits:
      "Khuwa Dudh Barfi is rich in calcium and protein, supporting the baby’s bone and muscle development. The healthy fats and iron from milk and nuts help boost maternal energy and prevent fatigue. It’s a nourishing treat when enjoyed in moderation during pregnancy.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use pasteurized milk and khuwa   to prevent any foodborne risk",
    "Avoid overconsumption due to high sugar and fat content",
    "Check for freshness of khuwa and nuts to avoid spoilage",
    ],
  },

  11: {

    name: "Paneer Palungo Tarkari (Paneer Spinach Curry)",
    difficulty: "Easy",

    time: "5 min",
    servings: 2,
    calories: 220,
    nutrients: ["Iron: 4–5 mg (mainly from spinach)","Calcium: 250–300 mg (mainly from paneer)",
    "Protein: 10–12 g","Vitamin A: 3000–4000 IU",],

    ingredients: [
      "200 gm paneer, cubed",
      "2 cups fresh spinach (palungo), washed and chopped",
      "1 medium onion, finely chopped",
      "1 medium tomato, chopped",
      "1 tbsp ginger-garlic paste",
      "1/2 tsp turmeric powder",
      "1 tsp cumin powder",
      "1/2 tsp coriander powder",
      "1/4 tsp red chili powder (optional)",
      "Salt to taste",
      "2 tbsp oil or ghee",
      "1/2 tsp garam masala (optional)",
    ],
    instructions: [
      "Heat oil in a pan and sauté paneer cubes until light golden, then set aside",
      "In the same pan, add chopped onions and sauté until translucent",
      "Add ginger-garlic paste and cook until fragrant",
      "Add chopped tomatoes and cook until soft",
      "Add turmeric, cumin, coriander, and chili powder; stir well",
      "Add chopped spinach and cook for 4–5 minutes until wilted",
      "Add a little water if needed and simmer for 5 more minutes",
      "Add fried paneer cubes and salt, mix well and cook for another 2–3 minutes",
      "Sprinkle garam masala (optional) and serve hot with rice or roti",
      ],

    tips: [
      "Use fresh, tender spinach for better taste and nutrition",
      "Fry paneer lightly to improve texture without making it chewy",
      "Do not overcook spinach to preserve nutrients and color",
    ],
    pregnancyBenefits:
      "Paneer Palungo Tarkari is an ideal pregnancy dish as it is rich in iron, calcium, and folate, which are vital for fetal development, bone health, and preventing anemia. The combination of spinach and paneer makes it a wholesome, protein-rich meal that supports both mother and baby when prepared with fresh, mild ingredients.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use fresh spinach and wash thoroughly to remove any dirt or pesticides",
    "Ensure paneer is fresh or use homemade to avoid contamination",],
  },

  12: {

    name: "Besan Chilla (Gram Flour Pancake)",
    difficulty: "Medium",

    time: "30 min",
    servings: 3,
    calories: 150,
    nutrients: ["Protein: 6–8 g per chilla",
      "Iron: 2–2.5 mg",
      "Calcium: 20–40 mg",
      "Fiber: 2–3 g",
      "Folate and magnesium: Present in good amounts",],
    ingredients: [
      "1 cup besan (gram flour)",
      "1/4 cup finely chopped onion",
      "1/4 cup finely chopped tomato",
      "2 tbsp chopped cilantro",
      "1–2 green chilies, finely chopped (optional)",
      "1/2 tsp cumin seeds",
      "1/4 tsp turmeric powder",
      "Salt to taste",
      "Water as needed for batter",
      "1–2 tbsp oil or ghee for cooking",
    ],
    instructions: [
      "In a mixing bowl, combine besan, turmeric, cumin seeds, and salt",
      "Add chopped onion, tomato, green chili, and cilantro",
      "Gradually add water and whisk to form a smooth, pourable batter",
      "Heat a non-stick pan or tawa and lightly grease with oil or ghee",
      "Pour a ladleful of batter and spread it like a pancake",
      "Cook on medium heat until golden brown on one side, then flip",
      "Cook the other side until fully cooked and slightly crispy",
      "Repeat for remaining batter and serve hot with chutney or curd",
    ],
    tips: [
      "Ensure the batter is lump-free for even cooking",
      "Add grated vegetables like carrot or spinach for extra nutrition",
      "Cook on medium heat to avoid burning and ensure full cooking",
    ],
    pregnancyBenefits:
      "Besan Chilla is a light, high-protein, and iron-rich dish perfect for pregnancy. Made from gram flour, it supports muscle development and helps prevent anemia. It’s easy to digest, customizable with vegetables, and ideal as a healthy breakfast or snack for expecting mothers.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use fresh besan to avoid bitterness or spoilage",
  "Add mild spices to suit pregnancy-related digestion needs",],
  },

  13: {
    name: "Okhar Ra Chaku Laddu (Walnut & Molasses Ball)",
    time: "25 min",
    servings: 4,
    calories: 380,
    nutrients: ["Omega-3: 2.2g", "Protein: 30g", "Vitamin E: 4mg", "Magnesium: 45mg"],
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
"Store the laddus in an airtight container; refrigerate if needed."

      
    ],
    tips: [
      "Prepare in advance and store for a week as a quick, nutritious snack.",
      "Limit to 1–2 laddus per day, as they contain natural sugars.",
      "Enhance with sesame seeds, almonds, or dry coconut for added nutrition and texture.",
      "Limit intake if you have gestational diabetes—consult your doctor.",
    ],
    pregnancyBenefits:
      "Okhar Ra Chaku Laddu is rich in Omega-3, iron, and calcium, making it ideal during pregnancy to support the baby’s brain development, boost maternal energy, and prevent anemia.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use fresh salmon", "Cook to proper temperature", "Check for nut allergies"],
  },

  15: {
    name: "Masu Jhol (Nepali Fish Curry)",
    time: "15 min",
    servings: 2,
    calories: 240,
    nutrients: ["Omega-3: 1.8g", "Fiber: 8g", "Protein: 6g", "Lignans: High"],
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
    tips: [
      "Use mustard oil for authentic flavor and added omega-3 benefits.",
"Do not over-fry the fish to keep it soft and juicy.",
    ],
    pregnancyBenefits:
      "Fish provides high-quality protein essential for the growth of maternal tissues and the baby.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Do not overconsume; limit fish to 2–3 servings per week as recommended for pregnant women.",
"Make sure the fish is fully cooked to kill any harmful bacteria or parasites.",],
  },

  17: {
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
    tips: [
      "Do not overcook broccoli to retain its nutrients and texture.",
"Add a squeeze of lemon juice after cooking for better taste and iron absorption.",
    ],
    pregnancyBenefits:
      "Broccoli is rich in Vitamin K, essential for proper blood clotting and bone health.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Wash broccoli thoroughly to remove pesticides and dirt.",
"Cook until tender to make it easier to digest during pregnancy.",],
  },

  18: {
    name: "Bhatmas Sadeko",
    time: "20 min",
    servings: 6,
    calories: 95,
    nutrients: ["Vitamin K: 85mcg", "Vitamin C: 12mg", "Folate: 35mcg", "Vitamin E: 2mg"],
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
    tips: [
      "Use freshly roasted soybeans for the best crunch and flavor.",
"Adjust lemon and chili based on your taste preference.",
    ],
    pregnancyBenefits:
     "Soybeans provide plant-based protein that supports fetal growth and maternal tissue repair.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Ensure soybeans are well-roasted to avoid hardness that can cause bloating.",],
  },
}

// Utility functions for syncing saved recipes with localStorage
function getSavedRecipesFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('savedRecipes') || '[]');
  } catch {
    return [];
  }
}

function setSavedRecipesToStorage(recipes: any[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('savedRecipes', JSON.stringify(recipes));
}

export default function TrimesterPage() {
  const params = useParams()
  const id = params.id as string
  const data = trimesterData[id as keyof typeof trimesterData]
  const [likedRecipes, setLikedRecipes] = useState<number[]>([])
  const [savedRecipes, setSavedRecipes] = useState<number[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)
  const [showRecipeModal, setShowRecipeModal] = useState(false)
  const { toast } = useToast()
  const { isPremium } = useSubscription()

  if (!data) {
    return <div>Trimester not found</div>
  }

  // Add this right after the data check and before the return statement
  const debugRecipeAccess = () => {
    console.log("🐛 Debug Recipe Access:", {
      isPremium,
      availableRecipes: Object.keys(detailedRecipes),
      selectedRecipe,
      showRecipeModal,
      nutrientRecipes: data.nutrients.flatMap((n) => n.recipes.map((r) => r.id)),
    })
  }

  const handleLike = (recipeId: number) => {
    setLikedRecipes((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]))
    toast({
      title: likedRecipes.includes(recipeId) ? "Recipe unliked" : "Recipe liked! ❤️",
      description: "Your preference has been saved.",
    })
  }

  const handleSave = (recipeId: number) => {
    setSavedRecipes((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]))
    toast({
      title: savedRecipes.includes(recipeId) ? "Removed from meal plan" : "Added to meal plan! 📝",
      description: savedRecipes.includes(recipeId)
        ? "Recipe removed from your meal plan."
        : "Recipe saved to your meal plan.",
    })
  }

  const canAccessRecipe = (recipe: any) => {
    return !recipe.premium || isPremium
  }

  const openRecipeDetails = (recipeId: number) => {
    console.log("🍳 Opening recipe details for ID:", recipeId)

    const recipe = detailedRecipes[recipeId as keyof typeof detailedRecipes]
    if (recipe) {
      console.log("✅ Recipe found:", recipe.name)
      setSelectedRecipe(recipe)
      setShowRecipeModal(true)
    } else {
      console.log("❌ Recipe not found, creating placeholder")
      // Create a placeholder recipe for missing ones
      const placeholderRecipe = {
        name: `Recipe ${recipeId}`,
        difficulty: "Easy",
        time: "30 min",
        servings: 4,
        calories: 250,
        nutrients: ["Protein: 15g", "Fiber: 8g", "Iron: 3mg", "Calcium: 200mg"],
        ingredients: [
          "2 cups main ingredient",
          "1 cup supporting ingredient",
          "2 tbsp seasoning",
          "1 tsp spices",
          "Salt and pepper to taste",
        ],
        instructions: [
          "Prepare all ingredients by washing and chopping as needed.",
          "Heat oil in a large pan over medium heat.",
          "Add main ingredients and cook for 10-15 minutes.",
          "Season with spices and cook for additional 5 minutes.",
          "Serve hot and enjoy your nutritious meal.",
        ],
        tips: [
          "Use fresh ingredients for best flavor",
          "Adjust seasoning to taste",
          "Store leftovers in refrigerator for up to 3 days",
        ],
        pregnancyBenefits:
          "This recipe provides essential nutrients needed during pregnancy, including protein for baby's growth and iron to prevent anemia.",
        image: "/placeholder.svg?height=300&width=400",
        safetyNotes: ["Ensure all ingredients are fresh", "Cook thoroughly", "Wash hands before preparation"],
      }
      setSelectedRecipe(placeholderRecipe)
      setShowRecipeModal(true)
    }
  }

  // Add this function to save a recipe to meal plan (localStorage)
  function saveRecipeToMealPlan(recipe: any) {
    const current = getSavedRecipesFromStorage();
    // Always use the full recipe details if available, fallback to the passed recipe
    let fullRecipe;
    const details = recipe && recipe.id && typeof detailedRecipes[recipe.id as keyof typeof detailedRecipes] === 'object' && detailedRecipes[recipe.id as keyof typeof detailedRecipes] !== null
      ? detailedRecipes[recipe.id as keyof typeof detailedRecipes]
      : {};
    fullRecipe = {
      ...details,
      ...recipe,
      // Always fill arrays from details if missing in recipe, with robust null/undefined checks and type casts
      ingredients: Array.isArray(recipe?.ingredients) && recipe.ingredients.length > 0
        ? recipe.ingredients
        : Array.isArray((details as any)?.ingredients) && (details as any).ingredients.length > 0
          ? (details as any).ingredients
          : [],
      instructions: Array.isArray(recipe?.instructions) && recipe.instructions.length > 0
        ? recipe.instructions
        : Array.isArray((details as any)?.instructions) && (details as any).instructions.length > 0
          ? (details as any).instructions
          : [],
      nutrients: Array.isArray(recipe?.nutrients) && recipe.nutrients.length > 0
        ? recipe.nutrients
        : Array.isArray((details as any)?.nutrients) && (details as any).nutrients.length > 0
          ? (details as any).nutrients
          : [],
      tips: Array.isArray(recipe?.tips) && recipe.tips.length > 0
        ? recipe.tips
        : Array.isArray((details as any)?.tips) && (details as any).tips.length > 0
          ? (details as any).tips
          : [],
      safetyNotes: Array.isArray(recipe?.safetyNotes) && recipe.safetyNotes.length > 0
        ? recipe.safetyNotes
        : Array.isArray((details as any)?.safetyNotes) && (details as any).safetyNotes.length > 0
          ? (details as any).safetyNotes
          : [],
      pregnancyBenefits: recipe?.pregnancyBenefits || (details as any)?.pregnancyBenefits || '',
      image: recipe?.image || (details as any)?.image || '',
      servings: recipe?.servings || (details as any)?.servings || 1,
      calories: recipe?.calories || (details as any)?.calories || 0,
      difficulty: recipe?.difficulty || (details as any)?.difficulty || 'Easy',
    };
    // Only save the selected recipe
    let recipesToSave = [fullRecipe];
    // Only filter out recipes without an id
    recipesToSave = recipesToSave.filter((r) => r && r.id);
    const updated = [
      ...current.filter((r: any) => !recipesToSave.some((s: any) => s.id === r.id)),
      ...recipesToSave,
    ];
    setSavedRecipesToStorage(updated);
    if (typeof window !== "undefined" && typeof toast === "function") {
      toast({
        title: "Recipe saved!",
        description: `${recipe.name} has been added to your meal plan.`,
      });
    }
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="relative">
        <Card className="glass-effect border-0 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
          <CardContent className="pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gradient mb-2">{data.title}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">{data.description}</p>
              </div>
              <Badge
                variant="outline"
                className="text-lg px-6 py-3 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border-0"
              >
                {data.weeks}
              </Badge>
            </div>
            {process.env.NODE_ENV === "development" && (
              <Button onClick={debugRecipeAccess} variant="outline" size="sm">
                Debug Recipes
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Nutrients */}
      {data.nutrients.map((nutrient, index) => (
        <Card key={index} className="glass-effect border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-2xl font-bold">{nutrient.name}</span>
                <Badge variant="secondary" className="ml-3 text-base px-3 py-1">
                  {nutrient.dailyAmount}
                </Badge>
              </div>
            </CardTitle>
            <CardDescription className="text-lg leading-relaxed">{nutrient.importance}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Foods rich in this nutrient */}
            <div>
              <h4 className="text-xl font-semibold mb-3 flex items-center">
                <Baby className="h-5 w-5 mr-2 text-pink-500" />
                Rich Food Sources:
              </h4>
              <div className="flex flex-wrap gap-3">
                {nutrient.foods.map((food, foodIndex) => (
                  <Badge
                    key={foodIndex}
                    variant="outline"
                    className="text-base px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-0"
                  >
                    {food}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recipes */}
            <div>
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Recommended Recipes:
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nutrient.recipes.map((recipe) => (
                  <Card
                    key={recipe.id}
                    className={`card-hover glass-effect border-0 shadow-lg ${!canAccessRecipe(recipe) ? "opacity-60" : ""}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold">{recipe.name}</CardTitle>
                        {recipe.premium && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-0"
                          >
                            Premium
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.time}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(recipe.id)}
                            disabled={!canAccessRecipe(recipe)}
                            className="p-2 hover:bg-pink-100 dark:hover:bg-pink-900/20 rounded-xl"
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                likedRecipes.includes(recipe.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                              }`}
                            />
                          </Button>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => saveRecipeToMealPlan(recipe)}
                            disabled={!canAccessRecipe(recipe)}
                            className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-xl"
                          >
                            <BookmarkPlus
                              className={`h-5 w-5 ${
                                savedRecipes.includes(recipe.id) ? "fill-blue-500 text-blue-500" : "text-gray-400"
                              }`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={!canAccessRecipe(recipe)}
                            className="p-2 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-xl"
                            onClick={() => handleSave(recipe.id)}
                          >
                            <MessageCircle className="h-5 w-5 text-gray-400" />
                          </Button>
                        </div>
                      </div>

                      <Button
                        className="w-full btn-gradient rounded-xl"
                        onClick={() => {
                          console.log("🔘 Recipe button clicked:", {
                            recipeId: recipe.id,
                            canAccess: canAccessRecipe(recipe),
                            isPremium,
                          })
                          if (canAccessRecipe(recipe)) {
                            openRecipeDetails(recipe.id)
                          } else {
                            toast({
                              title: "Premium Required",
                              description: "Upgrade to Premium to access this recipe",
                              variant: "destructive",
                            })
                          }
                        }}
                        disabled={!canAccessRecipe(recipe)}
                      >
                        {canAccessRecipe(recipe) ? "View Full Recipe" : "Upgrade for Recipe"}
                      </Button>

                      {!canAccessRecipe(recipe) && (
                        <div className="text-xs text-gray-500 text-center">
                          Upgrade to Premium to access this recipe
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Recipe Details Modal */}
      <Dialog open={showRecipeModal} onOpenChange={setShowRecipeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-gradient flex items-center space-x-3">
                  <ChefHat className="h-8 w-8 text-pink-500" />
                  <span>{selectedRecipe.name}</span>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="glass-effect border-0">
                      <CardContent className="pt-6">
                        <img
                          src={selectedRecipe.image || "/placeholder.svg"}
                          alt={selectedRecipe.name}
                          className="w-full h-48 object-cover rounded-xl mb-4"
                        />
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-3">
                            <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                            <div className="font-semibold">{selectedRecipe.time}</div>
                            <div className="text-xs text-gray-500">Prep + Cook</div>
                          </div>
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-3">
                            <Users className="h-5 w-5 mx-auto mb-1 text-green-500" />
                            <div className="font-semibold">{selectedRecipe.servings}</div>
                            <div className="text-xs text-gray-500">Servings</div>
                          </div>
                          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-3">
                            <Flame className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                            <div className="font-semibold">{selectedRecipe.calories}</div>
                            <div className="text-xs text-gray-500">Calories</div>
                          </div>
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-3">
                            <Star className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                            <div className="font-semibold">{selectedRecipe.difficulty}</div>
                            <div className="text-xs text-gray-500">Difficulty</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <Card className="glass-effect border-0">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Baby className="h-5 w-5 text-pink-500" />
                            <span>Pregnancy Benefits</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {selectedRecipe.pregnancyBenefits}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="glass-effect border-0">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Lightbulb className="h-5 w-5 text-yellow-500" />
                            <span>Pro Tips</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedRecipe.tips.map((tip: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ingredients" className="space-y-4">
                  <Card className="glass-effect border-0">
                    <CardHeader>
                      <CardTitle className="text-2xl">Ingredients</CardTitle>
                      <CardDescription>Everything you need for {selectedRecipe.servings} servings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedRecipe.ingredients.map((ingredient: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>{ingredient}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="instructions" className="space-y-4">
                  <Card className="glass-effect border-0">
                    <CardHeader>
                      <CardTitle className="text-2xl">Cooking Instructions</CardTitle>
                      <CardDescription>Step-by-step guide to perfect results</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedRecipe.instructions.map((instruction: string, index: number) => (
                          <div key={index} className="flex space-x-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1 pt-1">
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{instruction}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {selectedRecipe.safetyNotes && (
                    <Card className="glass-effect border-0 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-orange-700 dark:text-orange-300">
                          <Baby className="h-5 w-5" />
                          <span>Pregnancy Safety Notes</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedRecipe.safetyNotes.map((note: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-orange-700 dark:text-orange-300">{note}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="nutrition" className="space-y-4">
                  <Card className="glass-effect border-0">
                    <CardHeader>
                      <CardTitle className="text-2xl">Nutritional Information</CardTitle>
                      <CardDescription>Per serving nutritional breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedRecipe.nutrients.map((nutrient: string, index: number) => (
                          <div
                            key={index}
                            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 text-center"
                          >
                            <div className="font-bold text-lg text-green-700 dark:text-green-300">
                              {nutrient.split(":")[1]?.trim() || nutrient}
                            </div>
                            <div className="text-sm text-green-600 dark:text-green-400">
                              {nutrient.split(":")[0]?.trim() || "Nutrient"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading recipe details...</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
