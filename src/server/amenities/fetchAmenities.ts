import { supabase } from '@/server/supabase';

const fetchAmenities = async () => {
  const { data, error } = await supabase
    .from('amenities')
    .select('id, geom, amenity_type, name');

  if (error) {
    console.error(
      'Error fetching amenities from Supabase:',
      error
    );
    throw new Error('Failed to fetch amenities data');
  }

  const geojson = {
    type: 'FeatureCollection',
    features: data.map(f => ({
      type: 'Feature',
      geometry: f.geom,
      properties: {
        id: f.id,
        amenity_type: f.amenity_type,
        name: f.name,
      },
    })),
  };

  return geojson;
};

export default fetchAmenities;
