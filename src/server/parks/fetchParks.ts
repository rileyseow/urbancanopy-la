import { supabase } from '@/server/supabase';

const fetchParks = async () => {
  const [
    { data: polygons, error: polygonsError },
    { data: points, error: pointsError },
  ] = await Promise.all([
    supabase
      .from('parks_polygons_geojson')
      .select('id,name,geom'),

    supabase.from('parks_points').select('id,name,geom'),
  ]);

  if (polygonsError || pointsError) {
    console.error(
      'Error fetching parks from Supabase:',
      polygonsError || pointsError
    );
    throw new Error('Failed to fetch parks data');
  }

  const polygonsGeojson = {
    type: 'FeatureCollection',
    features: polygons.map(park => ({
      type: 'Feature',
      geometry: park.geom,
      properties: {
        id: park.id,
        name: park.name,
      },
    })),
  };

  const pointsGeojson = {
    type: 'FeatureCollection',
    features: points.map(park => ({
      type: 'Feature',
      geometry: park.geom,
      properties: {
        id: park.id,
        name: park.name,
      },
    })),
  };

  return {
    polygons: polygonsGeojson,
    points: pointsGeojson,
  };
};

export default fetchParks;
