# MetroCanopy LA

Real-time geospatial civic-tech platform for analyzing heat and shade accessibility across Los Angeles public transportation systems.

Combines live transit feeds, weather data, solar geometry, and urban environmental datasets to estimate stop-level pedestrian heat exposure and transit comfort conditions.

Deployed on Vercel at http://metrocanopy.vercel.app.

## Goals

- Explore climate accessibility in public transit systems
- Demonstrate real-time geospatial analytics workflows

## Features

- Live LA-area transit map using real-time GTFS feeds
- Real-time vehicle positions and arrivals
- Stop-level heat exposure scoring
- Dynamic shade estimation using solar position
- Tree canopy and building footprint overlays
- Transit corridor exposure heatmaps
- Hottest stop/corridor rankings
- Mobile-friendly interactive map UI

## Stack

```text
Transit + Weather Data
            ↓
Supabase / PostGIS
            ↓
Exposure + Spatial Analytics Processing
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

Realtime feed polling in 5-minute intervals. Cached server-side.

### Environment

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
WEATHER_API_KEY=your_key
```

### Data sources

- GTFS real-time vehicles
- GTFS static stops, routes
- LA tree canopy
- LA building footprint
- Weather API
