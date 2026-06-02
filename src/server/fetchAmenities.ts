import { supabase } from '@/server/supabase';
import type {
  AmenityFC,
  AmenityProperties,
} from '@/types/amenities.types';

const PAGE_SIZE = 1000;

const fetchAmenityType = async (
  amenityType: AmenityProperties['amenity_type']
): Promise<AmenityFC> => {
  let data = [];
  let from = 0;

  while (true) {
    const { data: page, error } = await supabase
      .from('amenities')
      .select('id, geom, amenity_type, name')
      .eq('amenity_type', amenityType)
      .order('id')
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      throw error;
    }

    data.push(...page);

    if (page.length < PAGE_SIZE) {
      break;
    }

    from += PAGE_SIZE;
  }

  return {
    type: 'FeatureCollection',
    features: data.map(f => ({
      type: 'Feature',
      geometry: f.geom,
      properties: {
        id: f.id,
        amenity_type: f.amenity_type,
        name: f.name || undefined,
      },
    })),
  };
};

export const fetchBicycleParking = () =>
  fetchAmenityType('bicycle_parking');

export const fetchDrinkingWater = () =>
  fetchAmenityType('drinking_water');

export const fetchToilets = () =>
  fetchAmenityType('toilets');
