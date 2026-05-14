# UrbanCanopy LA

Real-time geospatial web application for analyzing car-free accessible urban spaces across Los Angeles using environmental and spatial data.

Combines tree canopy coverage, live transit feeds, weather conditions, and points of interest datasets into an interactive map experience for discovering estimated shaded corridors, parks, cafes, transit stops, and pedestrian-friendly areas throughout the city.

Deployed on Vercel at http://urbancanopyla.vercel.app.

## Goals

- Explore climate accessibility and pedestrian comfort in urban environments
- Demonstrate real-time geospatial analytics and mapping workflows

## Features

- Live LA-area map
- Tree canopy and green space overlays
- Real-time GTFS vehicle positions and arrivals
- Parks, cafes, transit stops, and public-space POIs
- Live weather and temperature integration
- Estimated heat, shade, and comfort analytics
- Search and location filtering
- Mobile-friendly interactive map UI

## Stack

```text
Environmental + Spatial Data
              ↓
Supabase / PostGIS
              ↓
Geospatial + Comfort Analytics
              ↓
Next.js + MapLibre Visualization
```

- React + TypeScript
- MapLibre GL JS
- SCSS
- Next.js
- Supabase
- PostgreSQL + PostGIS

## Development

Real-time data polling + integration with cached server-side processing.

### Environment

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
WEATHER_API_KEY=your_key
```

### Data sources

- LA tree canopy
- LA building footprint
- LA parks and open-spaces
- OpenStreetMap / Overpass POIs
- GTFS real-time vehicles
- GTFS static stops, routes
- Weather API
