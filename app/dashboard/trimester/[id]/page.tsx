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
        importance: "Prevents neural tube defects",
        dailyAmount: "400-600 mcg",
        foods: ["Spinach", "Lentils", "Fortified cereals", "Asparagus"],
        recipes: [
          { id: 1, name: "Spinach and Lentil Curry", difficulty: "Easy", time: "30 min", likes: 45, premium: false },
          { id: 2, name: "Fortified Cereal Bowl", difficulty: "Easy", time: "5 min", likes: 23, premium: false },
          { id: 3, name: "Asparagus Quinoa Salad", difficulty: "Medium", time: "25 min", likes: 67, premium: true },
        ],
      },
      {
        name: "Iron",
        importance: "Prevents anemia and supports blood production",
        dailyAmount: "27 mg",
        foods: ["Lean meat", "Beans", "Tofu", "Dark chocolate"],
        recipes: [
          { id: 4, name: "Bean and Vegetable Stew", difficulty: "Easy", time: "45 min", likes: 89, premium: false },
          { id: 5, name: "Tofu Stir-fry", difficulty: "Easy", time: "20 min", likes: 34, premium: false },
          { id: 6, name: "Dark Chocolate Energy Balls", difficulty: "Easy", time: "15 min", likes: 156, premium: true },
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
        importance: "Essential for bone and teeth development",
        dailyAmount: "1000 mg",
        foods: ["Dairy products", "Leafy greens", "Almonds", "Sardines"],
        recipes: [
          { id: 7, name: "Creamy Spinach Smoothie", difficulty: "Easy", time: "10 min", likes: 78, premium: false },
          { id: 8, name: "Almond-Crusted Salmon", difficulty: "Medium", time: "35 min", likes: 92, premium: true },
          { id: 9, name: "Sardine Pasta Salad", difficulty: "Easy", time: "20 min", likes: 45, premium: false },
        ],
      },
      {
        name: "Protein",
        importance: "Supports baby's growth and maternal tissue changes",
        dailyAmount: "75-100g",
        foods: ["Chicken", "Fish", "Eggs", "Greek yogurt"],
        recipes: [
          { id: 10, name: "Herb-Roasted Chicken", difficulty: "Medium", time: "60 min", likes: 134, premium: false },
          { id: 11, name: "Greek Yogurt Parfait", difficulty: "Easy", time: "5 min", likes: 67, premium: false },
          { id: 12, name: "Salmon Teriyaki Bowl", difficulty: "Medium", time: "30 min", likes: 89, premium: true },
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
        foods: ["Salmon", "Walnuts", "Chia seeds", "Flaxseeds"],
        recipes: [
          { id: 13, name: "Walnut-Crusted Salmon", difficulty: "Medium", time: "25 min", likes: 156, premium: true },
          { id: 14, name: "Chia Seed Pudding", difficulty: "Easy", time: "10 min", likes: 89, premium: false },
          { id: 15, name: "Flaxseed Smoothie Bowl", difficulty: "Easy", time: "15 min", likes: 67, premium: false },
        ],
      },
      {
        name: "Vitamin K",
        importance: "Blood clotting and bone health",
        dailyAmount: "90 mcg",
        foods: ["Kale", "Broccoli", "Brussels sprouts", "Green beans"],
        recipes: [
          { id: 16, name: "Massaged Kale Salad", difficulty: "Easy", time: "15 min", likes: 78, premium: false },
          { id: 17, name: "Roasted Brussels Sprouts", difficulty: "Easy", time: "30 min", likes: 45, premium: false },
          { id: 18, name: "Green Bean Almondine", difficulty: "Medium", time: "20 min", likes: 56, premium: true },
        ],
      },
    ],
  },
}

const detailedRecipes = {
  1: {
    name: "Spinach and Lentil Curry",
    difficulty: "Easy",
    time: "30 min",
    servings: 4,
    calories: 285,
    nutrients: ["Folate: 180mcg (45% DV)", "Iron: 6.2mg (34% DV)", "Protein: 14g", "Fiber: 8g", "Vitamin C: 28mg"],
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
    tips: [
      "Rinse lentils thoroughly until water runs clear to remove any debris",
      "Don't overcook spinach to retain maximum folate and iron content",
      "Add a squeeze of lemon juice before serving for enhanced iron absorption",
      "For creamier texture, blend half the curry and mix back in",
      "Store leftovers in refrigerator for up to 3 days",
    ],
    pregnancyBenefits:
      "This recipe is a powerhouse for first trimester nutrition. The combination of lentils and spinach provides essential folate for neural tube development, iron to prevent anemia, and plant-based protein for your baby's growth. The coconut milk adds healthy fats for brain development.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Ensure lentils are fully cooked", "Wash spinach thoroughly", "Use pasteurized coconut milk"],
  },
  2: {
    name: "Fortified Cereal Bowl",
    difficulty: "Easy",
    time: "5 min",
    servings: 1,
    calories: 320,
    nutrients: ["Folate: 400mcg (100% DV)", "Iron: 18mg (100% DV)", "Vitamin B12: 6mcg", "Calcium: 300mg"],
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
    tips: [
      "Choose cereals fortified with folic acid and iron",
      "Use vitamin D fortified milk for extra benefits",
      "Add variety with different seasonal fruits",
      "Prepare toppings the night before for quick assembly",
    ],
    pregnancyBenefits:
      "Fortified cereals are an excellent source of synthetic folic acid, which is easily absorbed by the body. This quick breakfast provides 100% of your daily folate needs, essential for preventing birth defects.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Check expiration dates on dairy products", "Wash berries thoroughly"],
  },
  4: {
    name: "Bean and Vegetable Stew",
    difficulty: "Easy",
    time: "45 min",
    servings: 6,
    calories: 245,
    nutrients: ["Iron: 4.8mg (27% DV)", "Protein: 12g", "Fiber: 9g", "Folate: 120mcg", "Vitamin A: 8500 IU"],
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
    tips: [
      "Use a variety of beans for different textures and nutrients",
      "Add spinach at the end to preserve iron content",
      "Make a large batch and freeze portions for easy meals",
      "Serve with whole grain bread for complete protein",
    ],
    pregnancyBenefits:
      "This iron-rich stew helps prevent pregnancy anemia. The combination of beans and vegetables provides heme and non-heme iron, along with vitamin C to enhance absorption.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Ensure beans are fully cooked", "Wash all vegetables thoroughly"],
  },
  7: {
    name: "Creamy Spinach Smoothie",
    difficulty: "Easy",
    time: "10 min",
    servings: 2,
    calories: 180,
    nutrients: ["Calcium: 450mg (45% DV)", "Folate: 140mcg", "Vitamin K: 180mcg", "Protein: 8g"],
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
    tips: [
      "Use frozen banana for natural sweetness and creamy texture",
      "Start with less liquid and add more as needed",
      "Baby spinach has a milder flavor than mature leaves",
      "Add protein powder for extra nutrition if desired",
    ],
    pregnancyBenefits:
      "This calcium-rich smoothie supports your baby's bone and teeth development. The combination of dairy, leafy greens, and nuts provides easily absorbed calcium along with other essential nutrients.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use pasteurized dairy products", "Wash spinach thoroughly", "Check for any food allergies"],
  },
  10: {
    name: "Herb-Roasted Chicken",
    difficulty: "Medium",
    time: "60 min",
    servings: 4,
    calories: 285,
    nutrients: ["Protein: 35g", "Iron: 2.1mg", "Vitamin B6: 0.8mg", "Niacin: 12mg", "Selenium: 24mcg"],
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
    tips: [
      "Use a meat thermometer to ensure proper cooking",
      "Let chicken come to room temperature before cooking",
      "Save the pan juices for a delicious gravy",
      "Marinate overnight for deeper flavor",
    ],
    pregnancyBenefits:
      "High-quality protein is essential for your baby's rapid growth during the second trimester. This recipe provides complete amino acids needed for tissue development and maternal health.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: [
      "Cook to internal temperature of 165°F",
      "Avoid cross-contamination",
      "Wash hands after handling raw chicken",
    ],
  },
  14: {
    name: "Chia Seed Pudding",
    difficulty: "Easy",
    time: "10 min prep + 4 hours chill",
    servings: 2,
    calories: 220,
    nutrients: ["Omega-3: 2.5g", "Fiber: 10g", "Calcium: 180mg", "Protein: 6g", "Iron: 1.6mg"],
    ingredients: [
      "1/4 cup chia seeds",
      "1 cup coconut milk (canned, light)",
      "2 tbsp maple syrup or honey",
      "1 tsp vanilla extract",
      "1/4 tsp cinnamon",
      "Pinch of salt",
      "Fresh berries for topping",
      "Chopped nuts for topping",
      "Coconut flakes for garnish",
    ],
    instructions: [
      "In a bowl, whisk together coconut milk, maple syrup, vanilla, cinnamon, and salt.",
      "Add chia seeds and whisk vigorously for 2 minutes to prevent clumping.",
      "Let sit for 5 minutes, then whisk again to break up any clumps.",
      "Cover and refrigerate for at least 4 hours or overnight.",
      "Stir before serving to ensure even consistency.",
      "Divide into serving bowls or jars.",
      "Top with fresh berries, nuts, and coconut flakes.",
      "Serve chilled and enjoy within 3 days.",
    ],
    tips: [
      "Whisk frequently in the first 15 minutes to prevent clumping",
      "Adjust sweetness to taste preference",
      "Make several servings at once for easy breakfasts",
      "Try different milk alternatives for variety",
    ],
    pregnancyBenefits:
      "Chia seeds are one of the best plant-based sources of omega-3 fatty acids, crucial for your baby's brain and eye development during the third trimester. They also provide fiber to help with pregnancy constipation.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: [
      "Ensure chia seeds are fully hydrated before eating",
      "Start with small amounts if new to chia seeds",
    ],
  },
  16: {
    name: "Massaged Kale Salad",
    difficulty: "Easy",
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
      "1 large bunch kale, stems removed, leaves chopped",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "1/2 tsp salt",
      "1/4 cup dried cranberries",
      "1/4 cup toasted pine nuts",
      "1/4 cup grated Parmesan cheese",
      "1 avocado, diced",
      "2 tbsp pumpkin seeds",
      "Black pepper to taste",
    ],
    instructions: [
      "Remove tough stems from kale and chop leaves into bite-sized pieces.",
      "Place kale in a large bowl and drizzle with olive oil and lemon juice.",
      "Sprinkle with salt and massage the kale with your hands for 2-3 minutes.",
      "Continue massaging until kale becomes darker and softer.",
      "Add dried cranberries, pine nuts, and Parmesan cheese.",
      "Gently fold in diced avocado and pumpkin seeds.",
      "Season with black pepper and additional lemon juice if needed.",
      "Let sit for 10 minutes before serving to allow flavors to meld.",
    ],
    tips: [
      "Massaging breaks down tough fibers and makes kale more digestible",
      "Remove thick stems completely for better texture",
      "Add avocado just before serving to prevent browning",
      "Toast nuts and seeds for enhanced flavor",
    ],
    pregnancyBenefits:
      "Kale is incredibly rich in vitamin K, essential for proper blood clotting during delivery. It also provides folate, calcium, and antioxidants that support both maternal and fetal health.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Wash kale thoroughly", "Use pasteurized cheese", "Check for any food allergies to nuts"],
  },
  3: {
    name: "Asparagus Quinoa Salad",
    difficulty: "Medium",
    time: "25 min",
    servings: 4,
    calories: 220,
    nutrients: ["Folate: 160mcg (40% DV)", "Protein: 8g", "Fiber: 6g", "Vitamin K: 45mcg"],
    ingredients: [
      "1 cup quinoa, rinsed",
      "1 lb fresh asparagus, trimmed and cut into 1-inch pieces",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "1/4 cup toasted pine nuts",
      "1/4 cup dried cranberries",
      "2 tbsp fresh parsley, chopped",
      "1/4 cup crumbled feta cheese",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook quinoa according to package directions. Let cool completely.",
      "Steam asparagus for 3-4 minutes until tender-crisp. Cool in ice water.",
      "Whisk together olive oil, lemon juice, salt, and pepper.",
      "Combine quinoa, asparagus, pine nuts, and cranberries in a large bowl.",
      "Add dressing and toss gently to combine.",
      "Top with feta cheese and fresh parsley before serving.",
    ],
    tips: [
      "Don't overcook asparagus to retain nutrients",
      "Toast pine nuts for extra flavor",
      "Can be made ahead and chilled",
      "Add protein like grilled chicken for a complete meal",
    ],
    pregnancyBenefits:
      "Asparagus is rich in folate, essential for preventing neural tube defects. Quinoa provides complete protein and fiber for digestive health.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Wash asparagus thoroughly", "Use pasteurized feta cheese", "Store in refrigerator"],
  },

  5: {
    name: "Tofu Stir-fry",
    difficulty: "Easy",
    time: "20 min",
    servings: 3,
    calories: 195,
    nutrients: ["Iron: 4.2mg (23% DV)", "Protein: 12g", "Calcium: 150mg", "Vitamin C: 45mg"],
    ingredients: [
      "14 oz firm tofu, cubed",
      "2 tbsp vegetable oil",
      "1 bell pepper, sliced",
      "1 cup broccoli florets",
      "1 carrot, julienned",
      "2 cloves garlic, minced",
      "2 tbsp soy sauce (low sodium)",
      "1 tbsp sesame oil",
      "1 tsp fresh ginger, grated",
      "2 green onions, chopped",
      "1 tbsp sesame seeds",
    ],
    instructions: [
      "Press tofu to remove excess water, then cube.",
      "Heat oil in a large wok or skillet over high heat.",
      "Add tofu and cook until golden on all sides, about 5 minutes.",
      "Add garlic and ginger, stir for 30 seconds.",
      "Add vegetables and stir-fry for 3-4 minutes until tender-crisp.",
      "Mix in soy sauce and sesame oil.",
      "Garnish with green onions and sesame seeds.",
    ],
    tips: [
      "Press tofu well for better texture",
      "Keep vegetables crisp for maximum nutrition",
      "Serve over brown rice for complete meal",
      "Add cashews for extra protein and healthy fats",
    ],
    pregnancyBenefits:
      "Tofu provides plant-based protein and iron, essential during pregnancy. The colorful vegetables add vitamins and antioxidants for both mom and baby.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use pasteurized tofu", "Wash all vegetables thoroughly", "Cook to proper temperature"],
  },

  6: {
    name: "Dark Chocolate Energy Balls",
    difficulty: "Easy",
    time: "15 min",
    servings: 12,
    calories: 85,
    nutrients: ["Iron: 1.2mg", "Magnesium: 25mg", "Fiber: 2g", "Antioxidants: High"],
    ingredients: [
      "1 cup pitted dates",
      "1/2 cup almonds",
      "2 tbsp unsweetened cocoa powder",
      "2 tbsp chia seeds",
      "1 tbsp almond butter",
      "1 tsp vanilla extract",
      "Pinch of sea salt",
      "2 tbsp dark chocolate chips (optional)",
      "Coconut flakes for rolling",
    ],
    instructions: [
      "Soak dates in warm water for 10 minutes if very dry.",
      "Process almonds in food processor until finely chopped.",
      "Add dates, cocoa powder, chia seeds, almond butter, vanilla, and salt.",
      "Process until mixture sticks together when pressed.",
      "Fold in chocolate chips if using.",
      "Roll into 12 balls using your hands.",
      "Roll in coconut flakes if desired.",
      "Refrigerate for 30 minutes before serving.",
    ],
    tips: [
      "Use Medjool dates for natural sweetness",
      "Store in refrigerator for up to 1 week",
      "Make different flavors with various nuts",
      "Perfect for pregnancy cravings",
    ],
    pregnancyBenefits:
      "Dark chocolate provides iron and antioxidants. Dates offer natural energy and fiber, while almonds add healthy fats and protein for sustained energy.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Check for nut allergies", "Use high-quality cocoa powder", "Store properly to prevent spoilage"],
  },

  8: {
    name: "Almond-Crusted Salmon",
    difficulty: "Medium",
    time: "35 min",
    servings: 4,
    calories: 320,
    nutrients: ["Calcium: 180mg", "Omega-3: 1.8g", "Protein: 28g", "Vitamin D: 360 IU"],
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "1/2 cup sliced almonds",
      "1/4 cup panko breadcrumbs",
      "2 tbsp olive oil",
      "1 tbsp Dijon mustard",
      "1 tbsp honey",
      "1 lemon, zested and juiced",
      "2 tbsp fresh dill, chopped",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "Mix almonds, breadcrumbs, olive oil, lemon zest, and dill.",
      "Season salmon with salt and pepper.",
      "Brush salmon with mixture of mustard, honey, and lemon juice.",
      "Press almond mixture onto top of each fillet.",
      "Bake for 12-15 minutes until fish flakes easily.",
      "Serve immediately with lemon wedges.",
    ],
    tips: [
      "Don't overcook salmon to retain moisture",
      "Toast almonds lightly for extra flavor",
      "Check internal temperature reaches 145°F",
      "Serve with roasted vegetables",
    ],
    pregnancyBenefits:
      "Salmon provides DHA omega-3 fatty acids crucial for baby's brain development. Almonds add calcium for bone health and healthy fats.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use fresh, high-quality salmon", "Cook to proper internal temperature", "Check for fish allergies"],
  },

  9: {
    name: "Sardine Pasta Salad",
    difficulty: "Easy",
    time: "20 min",
    servings: 4,
    calories: 285,
    nutrients: ["Calcium: 240mg", "Omega-3: 1.2g", "Protein: 18g", "Vitamin B12: 8mcg"],
    ingredients: [
      "8 oz whole wheat pasta",
      "2 cans sardines in olive oil, drained",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, thinly sliced",
      "1/4 cup capers",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "2 tbsp fresh parsley, chopped",
      "1/4 cup pine nuts",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook pasta according to package directions. Drain and cool.",
      "Gently break sardines into bite-sized pieces.",
      "Combine pasta, sardines, tomatoes, onion, and capers.",
      "Whisk together olive oil, lemon juice, salt, and pepper.",
      "Toss pasta mixture with dressing.",
      "Top with parsley and pine nuts.",
      "Serve chilled or at room temperature.",
    ],
    tips: [
      "Use high-quality sardines for best flavor",
      "Don't overdress the salad",
      "Can be made ahead for better flavor",
      "Add fresh herbs for extra taste",
    ],
    pregnancyBenefits:
      "Sardines are rich in calcium and omega-3s, essential for baby's bone and brain development. They're also a safe fish choice during pregnancy.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Choose sardines from reputable sources", "Check expiration dates", "Store leftovers properly"],
  },

  11: {
    name: "Greek Yogurt Parfait",
    difficulty: "Easy",
    time: "5 min",
    servings: 2,
    calories: 180,
    nutrients: ["Protein: 15g", "Calcium: 200mg", "Probiotics: High", "Vitamin B12: 1.2mcg"],
    ingredients: [
      "1 cup Greek yogurt (plain)",
      "1/2 cup mixed berries",
      "1/4 cup granola",
      "2 tbsp honey",
      "1 tbsp chia seeds",
      "1/4 cup chopped walnuts",
      "1 tsp vanilla extract",
      "Fresh mint for garnish",
    ],
    instructions: [
      "Mix Greek yogurt with vanilla extract and half the honey.",
      "Layer yogurt mixture in glasses or bowls.",
      "Add a layer of berries and granola.",
      "Repeat layers as desired.",
      "Top with chia seeds, walnuts, and remaining honey.",
      "Garnish with fresh mint.",
      "Serve immediately for best texture.",
    ],
    tips: [
      "Use full-fat Greek yogurt for creaminess",
      "Choose low-sugar granola",
      "Mix different berries for variety",
      "Prepare components ahead for quick assembly",
    ],
    pregnancyBenefits:
      "Greek yogurt provides protein and probiotics for digestive health. Berries add antioxidants and vitamin C, while nuts provide healthy fats.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use pasteurized dairy products", "Wash berries thoroughly", "Check for nut allergies"],
  },

  12: {
    name: "Salmon Teriyaki Bowl",
    difficulty: "Medium",
    time: "30 min",
    servings: 4,
    calories: 340,
    nutrients: ["Protein: 25g", "Omega-3: 1.5g", "Iron: 2.1mg", "Vitamin D: 320 IU"],
    ingredients: [
      "4 salmon fillets (5 oz each)",
      "2 cups cooked brown rice",
      "1 cup edamame, shelled",
      "1 cucumber, sliced",
      "1 avocado, sliced",
      "2 tbsp low-sodium soy sauce",
      "1 tbsp honey",
      "1 tbsp rice vinegar",
      "1 tsp sesame oil",
      "1 tsp fresh ginger, grated",
      "2 tbsp sesame seeds",
      "2 green onions, chopped",
    ],
    instructions: [
      "Mix soy sauce, honey, vinegar, sesame oil, and ginger for teriyaki sauce.",
      "Marinate salmon in half the sauce for 15 minutes.",
      "Cook salmon in a pan for 4-5 minutes per side.",
      "Steam edamame until tender.",
      "Assemble bowls with rice, salmon, edamame, cucumber, and avocado.",
      "Drizzle with remaining teriyaki sauce.",
      "Garnish with sesame seeds and green onions.",
    ],
    tips: [
      "Don't overcook salmon to keep it moist",
      "Use low-sodium soy sauce",
      "Add pickled vegetables for extra flavor",
      "Serve with wasabi on the side",
    ],
    pregnancyBenefits:
      "This bowl provides complete nutrition with omega-3s for brain development, protein for growth, and complex carbs for sustained energy.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Cook salmon to 145°F internal temperature", "Use pasteurized ingredients", "Wash all vegetables"],
  },

  13: {
    name: "Walnut-Crusted Salmon",
    difficulty: "Medium",
    time: "25 min",
    servings: 4,
    calories: 380,
    nutrients: ["Omega-3: 2.2g", "Protein: 30g", "Vitamin E: 4mg", "Magnesium: 45mg"],
    ingredients: [
      "4 salmon fillets (6 oz each)",
      "1/2 cup walnuts, finely chopped",
      "2 tbsp whole wheat breadcrumbs",
      "2 tbsp olive oil",
      "1 tbsp Dijon mustard",
      "1 tbsp maple syrup",
      "1 lemon, zested",
      "2 tbsp fresh thyme",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Mix walnuts, breadcrumbs, olive oil, lemon zest, and thyme.",
      "Season salmon with salt and pepper.",
      "Brush salmon with mixture of mustard and maple syrup.",
      "Press walnut mixture firmly onto salmon.",
      "Bake for 12-14 minutes until crust is golden.",
      "Let rest 2 minutes before serving.",
    ],
    tips: [
      "Chop walnuts finely for better adherence",
      "Don't press crust too hard",
      "Serve with roasted vegetables",
      "Check doneness with a fork",
    ],
    pregnancyBenefits:
      "Double dose of omega-3s from salmon and walnuts supports baby's brain and eye development. Walnuts also provide vitamin E and healthy fats.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use fresh salmon", "Cook to proper temperature", "Check for nut allergies"],
  },

  15: {
    name: "Flaxseed Smoothie Bowl",
    difficulty: "Easy",
    time: "15 min",
    servings: 2,
    calories: 240,
    nutrients: ["Omega-3: 1.8g", "Fiber: 8g", "Protein: 6g", "Lignans: High"],
    ingredients: [
      "1 frozen banana",
      "1/2 cup frozen mixed berries",
      "1/2 cup almond milk",
      "2 tbsp ground flaxseed",
      "1 tbsp almond butter",
      "1 tsp honey",
      "1/4 cup granola",
      "2 tbsp coconut flakes",
      "1 tbsp chia seeds",
      "Fresh berries for topping",
    ],
    instructions: [
      "Blend banana, frozen berries, almond milk, flaxseed, almond butter, and honey until thick.",
      "Pour into bowls.",
      "Top with granola, coconut flakes, and chia seeds.",
      "Arrange fresh berries on top.",
      "Drizzle with additional honey if desired.",
      "Serve immediately while cold.",
    ],
    tips: [
      "Use frozen fruit for thick consistency",
      "Grind flaxseeds fresh for best nutrition",
      "Add protein powder for extra nutrition",
      "Customize toppings to preference",
    ],
    pregnancyBenefits:
      "Flaxseeds provide plant-based omega-3s essential for baby's development. The fiber helps with pregnancy constipation, and antioxidants support overall health.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Use ground flaxseed for better absorption", "Store flaxseed properly", "Wash all fruits"],
  },

  17: {
    name: "Roasted Brussels Sprouts",
    difficulty: "Easy",
    time: "30 min",
    servings: 4,
    calories: 120,
    nutrients: ["Vitamin K: 195mcg", "Vitamin C: 85mg", "Folate: 60mcg", "Fiber: 4g"],
    ingredients: [
      "1.5 lbs Brussels sprouts, halved",
      "3 tbsp olive oil",
      "3 cloves garlic, minced",
      "1/4 cup balsamic vinegar",
      "2 tbsp honey",
      "1/4 cup dried cranberries",
      "1/4 cup toasted pine nuts",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Toss Brussels sprouts with olive oil, salt, and pepper.",
      "Roast for 20-25 minutes until caramelized.",
      "Mix balsamic vinegar, honey, and garlic.",
      "Drizzle over roasted sprouts.",
      "Top with cranberries and pine nuts.",
      "Roast 5 more minutes and serve.",
    ],
    tips: [
      "Don't overcrowd the pan",
      "Cut sprouts uniformly for even cooking",
      "Add bacon for extra flavor (if desired)",
      "Serve immediately while hot",
    ],
    pregnancyBenefits:
      "Brussels sprouts are rich in vitamin K for blood clotting and folate for neural tube development. They also provide fiber and antioxidants.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Wash Brussels sprouts thoroughly", "Cook until tender", "Check for any spoiled leaves"],
  },

  18: {
    name: "Green Bean Almondine",
    difficulty: "Medium",
    time: "20 min",
    servings: 6,
    calories: 95,
    nutrients: ["Vitamin K: 85mcg", "Vitamin C: 12mg", "Folate: 35mcg", "Vitamin E: 2mg"],
    ingredients: [
      "2 lbs fresh green beans, trimmed",
      "1/4 cup sliced almonds",
      "3 tbsp butter",
      "2 tbsp lemon juice",
      "1 tbsp lemon zest",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
    ],
    instructions: [
      "Blanch green beans in boiling salted water for 4-5 minutes.",
      "Transfer to ice water to stop cooking.",
      "Toast almonds in a dry pan until golden.",
      "Melt butter in large skillet over medium heat.",
      "Add garlic and cook for 30 seconds.",
      "Add green beans and toss to heat through.",
      "Add lemon juice, zest, and toasted almonds.",
      "Season and garnish with parsley.",
    ],
    tips: [
      "Don't overcook green beans",
      "Toast almonds carefully to prevent burning",
      "Use fresh lemon for best flavor",
      "Serve as a side dish",
    ],
    pregnancyBenefits:
      "Green beans provide vitamin K essential for blood clotting during delivery. Almonds add vitamin E and healthy fats for baby's development.",
    image: "/placeholder.svg?height=300&width=400",
    safetyNotes: ["Wash green beans thoroughly", "Trim ends properly", "Check for any spoiled beans"],
  },
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
                        <span>{recipe.difficulty}</span>
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
                          <span className="text-sm text-gray-600 dark:text-gray-400">{recipe.likes}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSave(recipe.id)}
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
