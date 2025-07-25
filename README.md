# Birdwatcher App

A mobile-first bird-watching application where users collect birds like a Pokédex. Users take photos with their phone; the app identifies the species using Google’s Gemini-2.5-Flash vision model and stores them in a personal collection.

## Architecture

1. **Mobile app** – Built with Expo React Native. Handles camera capture and local collection UI.
2. **Backend** – Node.js + Express API that forwards images to Gemini vision model.

![Architecture Diagram](docs/architecture.png)

## Prerequisites

* Node.js ≥ 18
* Expo CLI `npm i -g expo-cli`
* Google Generative AI API key with access to `gemini-2.5-flash` vision model

## Setup & Run

```bash
# 1. Backend
cd backend
cp .env.example .env # add your GOOGLE_API_KEY
npm install
npm start           # http://localhost:3001

# 2. Mobile
cd ../mobile
npm install
expo start          # run on device/simulator
```

## Environment Variables (backend/.env)

```
GOOGLE_API_KEY=YOUR_KEY_HERE
PORT=3001
```

## How It Works

1. CameraScreen captures a photo in Base64.
2. POST `/classify` with `{ image }`.
3. Backend asks Gemini-2.5-Flash to identify the bird species.
4. Result saved in React context; CollectionScreen lists all identified birds.

## Production Notes

* Replace `localhost` in `CameraScreen.js` with your server URL when deploying to real devices.
* Persist collection to AsyncStorage or remote DB for cross-device sync.
* Rate-limit or cache Gemini requests to manage costs.