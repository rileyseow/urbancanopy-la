import { supabase } from '@/server/supabase';
import type { ParkFC } from '@/types/parks.types';

const COLS = 'id, geometry, acres, managing_agency, name';

const fetchParks = async (): Promise<ParkFC> => {
  // 1740 rows in db - fetch in 2 pages
  const [
    { data: page1, error: error1 },
    { data: page2, error: error2 },
  ] = await Promise.all([
    supabase
      .from('parks')
      .select(COLS)
      .order('id')
      .range(0, 999),
    supabase
      .from('parks')
      .select(COLS)
      .order('id')
      .range(1000, 1999),
  ]);

  if (error1 || error2) {
    console.error(
      'Error fetching parks data from Supabase:',
      error1 || error2
    );
    throw new Error('Failed to fetch parks data');
  }

  const data = [...page1, ...page2];

  // return as geojson
  return {
    type: 'FeatureCollection',
    features: data.map(f => ({
      type: 'Feature',
      geometry: f.geometry,
      properties: {
        id: f.id,
        acres: f.acres,
        managing_agency: f.managing_agency,
        name: f.name,
      },
    })),
  };
};

export default fetchParks;
