import { supabase } from '@/server/supabase';
import type { ParkFC } from '@/types/parks.types';

const PAGE_SIZE = 1000;

const fetchParks = async (): Promise<ParkFC> => {
  let data = [];
  let from = 0;

  while (true) {
    const { data: page, error } = await supabase
      .from('parks')
      .select('id, geometry, acres, managing_agency, name')
      .order('id')
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      console.error(
        'Error fetching parks data from Supabase:',
        error
      );
      throw new Error('Failed to fetch parks data');
    }

    data.push(...page);

    if (page.length < PAGE_SIZE) {
      break;
    }

    from += PAGE_SIZE;
  }

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
