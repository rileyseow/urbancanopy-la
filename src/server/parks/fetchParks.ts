import { supabase } from '@/server/supabase';

export const fetchParksPoints = async () => {
  const { data, error } = await supabase
    .from('parks_points')
    .select('id,name,geom');

  if (error) {
    console.error(
      'Error fetching parks points from Supabase:',
      error
    );
    throw new Error('Failed to fetch parks points data');
  }

  const geojson = {
    type: 'FeatureCollection',
    features: data.map(f => ({
      type: 'Feature',
      geometry: f.geom,
      properties: {
        id: f.id,
        name: f.name,
      },
    })),
  };

  return geojson;
};

export const fetchParksPolygons = async () => {
  const { data, error } = await supabase
    .from('parks_polygons_geojson')
    .select('id,name,geom');

  if (error) {
    console.error(
      'Error fetching parks polygons from Supabase:',
      error
    );
    throw new Error('Failed to fetch parks polygons data');
  }

  const geojson = {
    type: 'FeatureCollection',
    features: data.map(f => ({
      type: 'Feature',
      geometry: f.geom,
      properties: {
        id: f.id,
        name: f.name,
      },
    })),
  };

  return geojson;
};
