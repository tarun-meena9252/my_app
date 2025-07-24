# 🧳 Itinerary Making App

This is a mobile travel planner built using [Expo](https://expo.dev) and [React Native](https://reactnative.dev), designed to generate day-by-day itineraries for users based on trip preferences.

## 🚀 Features

- Take user input such as:
  - Trip location
  - Start and end dates
  - Budget
  - Type of accommodation
  - Travel companions
- Generate a day-wise travel itinerary automatically.
- Suggest hotels and places to visit using **Google Places API**.
- Store all trip data in a **Supabase PostgreSQL** database.
- Display saved itineraries on the home screen.

## 🛠 Tech Stack

- **Frontend**: React Native, Expo, Tailwind
- **Backend**: FastAPI (from [autoCompleteApi repo](https://github.com/tarun-meena9252/placeName-autoComplete-api.git))
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini 4.0 Flash (LLM)
- **APIs**: Google Places API, Gemini API
- **Tunneling**: ngrok (for connecting local API)

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tarun-meena9252/my_app.git
```
### 2. 🔑 API & Environment Setup

To run this project, create a `.env` file in the root directory with the following environment variables:

```env
# Ngrok reserved domain for local backend routing
BASE_URL=https://some-name.ngrok-free.app

# Gemini LLM for generating trip itineraries
GOOGLE_GEMINI_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=
GOOGLE_GEMINI_MODEL=gemini-2.5-flash
GOOGLE_GEMINI_API_KEY=

# Google Places API for hotel/location suggestions
GOOGLE_CLOUD_API_KEY=

# Supabase project credentials for storing user data
SUPABASE_URL=
SUPABASE_ANON_KEY=
```
💡 Notes

   BASE_URL: Used for calling backend endpoints via ngrok tunnel (e.g., itinerary generation)

   GOOGLE_GEMINI_URL, GOOGLE_GEMINI_MODEL, and GOOGLE_GEMINI_API_KEY: Used to generate itineraries using Gemini 4.0 Flash LLM

   GOOGLE_CLOUD_API_KEY: Required for accessing Google Places API

   SUPABASE_URL and SUPABASE_ANON_KEY: Your Supabase project credentials

   Make sure not to commit your .env file to version control (add it to .gitignore).

### 3. Install dependencies

```bash
npm install
```
### 4. Start the development server

```bash
npx expo start
```
