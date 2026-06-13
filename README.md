# UrbanCanopy LA

UrbanCanopy LA is a geospatial web application for analyzing car-free accessible urban spaces across Los Angeles.

The interactive map allows users to explore walkability and transit access, shade availability, cooling resources, and green space.

Built with Next.js, TypeScript, MapLibre, Supabase, and PostGIS.

**Live Demo:** http://urbancanopyla.vercel.app.

## Goals

- Explore how environmental infrastructure affects pedestrian accessibility in urban environments
- Demonstrate geospatial data engineering workflows using PostGIS and modern web mapping tools
- Transform large public datasets into interactive map visualizations and derived spatial analytics

## Features

### Environmental Layers

- Tree density visualization derived from 2022 Los Angeles County urban tree inventory data
- Shade coverage visualization generated from countywide building footprint data
- Live temperature overlay powered by Open-Meteo
- Current weather and environment metrics optionally tied to user location
- Custom shade scoring model combining vegetation density and built-environment characteristics

### Transit & Public Amenities

- Transit routes and stops from GTFS data
- Parks and recreational spaces
- Public restrooms
- Water refill stations
- Bicycle parking
- Ice cream shops

### Mapping & Interaction

- Interactive MapLibre GL JS web map
- Layer visibility controls
- User geolocation support
- Geojson rendering backed by PostGIS
- Subtle terrain context layer using OpenStreetMap hillshade raster tiles
- 3D building visualization using MapLibre `fill-extrusion` rendering and OpenFreeMap building data

## Stack

```text
Public Datasets + APIs
              ↓
PostGIS / Supabase
              ↓
Spatial Aggregation + Analytics
              ↓
Next.js API Layer
              ↓
MapLibre Visualization
```

### Frontend

- Next.js
- React
- TypeScript
- SCSS
- MapLibre GL JS

### Backend & Data

- Supabase
- PostgreSQL
- PostGIS
- H3 Spatial Indexing

## Data Sources

- Los Angeles County Building Outlines (2020) - LARIAC6_BUILDINGS_2020\
  https://data.lacounty.gov/datasets/lacounty::countywide-building-outlines-2020/about?layer=0

- Los Angeles County Urban Trees (2022)\
  https://data.lacounty.gov/datasets/lacounty::2022-urban-trees/about

- Los Angeles County Recreational Spaces\
  https://egis-lacounty.hub.arcgis.com/datasets/lacounty::recreational-spaces/about

- Open-Meteo Forecast API, Air Quality API\
  https://open-meteo.com/en/docs

- Open-Meteo `weather-map-layer`\
  https://www.npmjs.com/package/@openmeteo/weather-map-layer

- OpenStreetMap US Tileservice Hillshade Raster Tiles\
  https://tiles.openstreetmap.us/raster/hillshade/#map=8/37.2/-119.7

- OpenStreetMap / Overpass API\
  https://wiki.openstreetmap.org/wiki/Key:amenity

- GTFS Routes and Stops\
  https://mobilitydatabase.org

## Local Development

### Environment Variables

```env
SUPABASE_URL=your_url
SUPABASE_PUBLISHABLE_KEY=your_key
```

### Install

```bash
npm install
npm run dev
```

## Future Improvements

- Time-aware shade estimation using solar position calculations
- Expanded pedestrian comfort analytics tied to user location
- Expanded transit accessibility data
