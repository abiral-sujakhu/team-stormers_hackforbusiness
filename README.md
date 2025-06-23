# 🌸 Aahar - Pregnancy Nutrition Guide

**Aahar** is a progressive web application designed to provide trimester-wise essential nutritional guidance to pregnant women, with a special focus on locally available Nepali foods. The app aims to improve maternal health through personalized recommendations and potential collaboration with doctors, clinics, INGOs, and NGOs.

---

## 🧠 Purpose

The goal of **Aahar** is to tackle nutritional deficiencies during pregnancy by:
- Offering trimester-specific nutrient and meal suggestions
- Encouraging the use of locally accessible and culturally familiar foods
- Promoting awareness about balanced diets among expecting mothers
- Building a collaborative network with healthcare providers and organizations

---

## 🚀 Features

- ✅ Trimester-wise nutrition breakdown (1st, 2nd, 3rd)
- 🍲 Curated meal plans using local Nepali recipes
- 💬 Premium content access for verified users
- 🔖 Bookmark recipes using local storage or Supabase
- 📱 PWA support for offline use and mobile experience
- 🩺 Doctor/clinic listing and appointment module *(planned)*
- 🌍 NGO/INGO collaboration module *(in development)*

---

## 🛠 Tech Stack

| Layer      | Tech                        |
|------------|-----------------------------|
| Frontend   | Next.js 14+, Tailwind CSS   |
| Backend    | Supabase (Database + Auth)  |
| Hosting    | Vercel (frontend), Supabase |
| Storage    | Supabase & localStorage     |
| PWA        | next-pwa (service worker, manifest) |

---

## 📁 Project Structure
/aahar
├── components/ # UI Components (cards, buttons, tabs)

├── pages/ # Next.js route pages (home, login, meal plans)

├── lib/ # Utility functions (recipes, API helpers)

├── public/ # Static assets, manifest, icons

├── styles/ # Global and component styles

├── supabase/ # Supabase client setup

├── .env.local # Environment variables (Supabase keys)


---

## 🧪 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/aahar.git
   cd aahar
npm install

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

npm run dev

🔒 Authentication & Authorization

- Subscription (Premium/Free) logic is handled via Supabase RLS.

- Protected routes are gated with subscription checks.

🌐 Live Demo
Coming soon on Vercel Deployment (Under development)

🤝 Collaboration Goals
We're looking to collaborate with:

- Obstetricians and Gynecologists
- Maternal Health NGOs/INGOs
- Local Clinics & Health Posts
- Nutritionists/Dieticians

Interested? Reach us at aahar.project@gmail.com

 👥 Team Info
👑 Team Name: Team Stormers
🧑‍💻 Team Members:
- Resima Budhathoki
- Dipshikha Khadka
- Abiral Sujakhu

📝 License
MIT License © 2025 Aahar Team

🎯 Built for Hack For Business 2025
Aahar was ideated and built with ❤️ as part of the Hack For Business hackathon — solving real problems through innovation in maternal care and nutrition.



