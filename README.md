# Aus Weather Watch 🌦️🇦🇺

**Real-time Australian Weather Tracker**  
A clean, modern, responsive web application that provides live weather conditions, 7-day forecasts, and severe weather alerts for locations across Australia.

![Aus Weather Watch Screenshot](screenshots/homepage.png)  
*(Add a screenshot of your running site here later)*

## 🌟 Project Overview

Aus Weather Watch was rapidly developed using **Bolt.new** (AI-powered development tool on StackBlitz).  
It pulls real-time data directly from official Australian government sources — no paid APIs required.

Users can:
- Search any Australian city, suburb or postcode
- View current temperature, "feels like", humidity, wind, UV, and rainfall
- See a 7-day forecast
- Receive severe weather alert banners
- Browse major Australian cities with one click

## 🚀 Live Demo

**🌐 [https://your-domain.com](https://your-domain.com)**  
*(Update this once you deploy to your cloud server)*

## 📹 Assignment Video Explainer

[▶ Watch the Setup & Demo Video](https://youtu.be/YOUR_VIDEO_LINK)  
*(Link your recorded video here after you deploy the site to your cloud VM)*

## 🛠️ Tech Stack

| Layer              | Technology                                      |
|--------------------|-------------------------------------------------|
| Framework          | React 18 + Vite                                 |
| Styling            | Tailwind CSS                                    |
| AI Builder         | Bolt.new (StackBlitz AI)                        |
| Data Sources       | Bureau of Meteorology (BOM) public JSON feeds + Open-Meteo |
| Hosting (Planned)  | Ubuntu 24.04 LTS + Nginx on cloud VM           |
| Version Control    | Git + GitHub                                    |

## 📡 Data Sources

- Current observations and warnings → **Bureau of Meteorology (BOM)**
- Forecasts → **Open-Meteo + BOM ACCESS-G model**
- All data is free and publicly available

## 📂 Project Structure

- `src/` — React components and logic
- `public/` — Static assets
- `screenshots/` — Project images (add later)
- `scripts/` — Automation scripts (to be added during deployment)

## 🔧 Local Development

```bash
npm install
npm run dev
