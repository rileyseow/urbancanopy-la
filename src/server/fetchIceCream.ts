import { supabase } from '@/server/supabase';
import type { IceCreamFC } from '@/types/iceCream.types';

const fetchIceCream = async (): Promise<IceCreamFC> => {
  const { data, error } = await supabase
    .from('ice_cream')
    .select('id, geom, name, opening_hours');

  if (error) {
    console.error(
      'Error fetching ice cream features from Supabase:',
      error
    );
    throw new Error('Failed to fetch ice cream data');
  }

  // return as geojson
  return {
    type: 'FeatureCollection',
    features: data.map(f => ({
      type: 'Feature',
      geometry: f.geom,
      properties: {
        id: f.id,
        name: f.name || undefined,
        opening_hours: f.opening_hours || undefined,
      },
    })),
  };
};

export default fetchIceCream;
