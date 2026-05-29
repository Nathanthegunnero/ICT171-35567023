# Aus Weather Watch 🌦️🇦🇺

**Real-time Australian Weather Tracker**

A clean, modern, responsive web application that provides live weather conditions, 7-day forecasts, and severe weather alerts for locations across Australia.

![Aus Weather Watch](screenshots/homepage.png)

## 🚀 Live Site

**🌐 https://ausweather.watch**

## 📹 Project Video

[▶ Watch Setup & Demo Video](https://youtu.be/YOUR_VIDEO_LINK)

## 🌟 Project Overview

Aus Weather Watch was built using Bolt.new (StackBlitz AI) and manually deployed to an AWS EC2 cloud instance. The site pulls real-time data from official Australian Bureau of Meteorology sources.

### Key Features
- Search any Australian city or postcode
- Current weather conditions with detailed information
- 7-day forecast
- Severe weather alerts
- Responsive design (mobile friendly)
- HTTPS secured with Let's Encrypt

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Hosting**: AWS EC2 (Ubuntu 24.04) + Nginx
- **Domain**: ausweather.watch (Namecheap)
- **SSL**: Let's Encrypt (Certbot)
- **Version Control**: GitHub

## 📡 Data Sources
- Bureau of Meteorology (BOM) public feeds
- Open-Meteo API

## 📂 Documentation

- [Deployment Guide](docs/deployment.md)
- [Architecture](docs/architecture.md)

## 🔧 Local Development

```bash
npm install
npm run build
