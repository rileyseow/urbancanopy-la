import { useQuery } from '@tanstack/react-query';

export const useAmenities = () => {
  return useQuery({
    queryKey: ['amenities'],
    queryFn: async () => {
      const response = await fetch('/api/amenities');
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};

export const useIceCream = () => {
  return useQuery({
    queryKey: ['iceCream'],
    queryFn: async () => {
      const response = await fetch('/api/iceCream');
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};

export const useParks = () => {
  return useQuery({
    queryKey: ['parks'],
    queryFn: async () => {
      const response = await fetch('/api/parks');
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};

export const useTransitRoutes = () => {
  return useQuery({
    queryKey: ['transit', 'routes'],
    queryFn: async () => {
      const response = await fetch('/api/transit/routes');
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};

export const useTransitStops = () => {
  return useQuery({
    queryKey: ['transit', 'stops'],
    queryFn: async () => {
      const response = await fetch('/api/transit/stops');
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};

export const useTreeDensity = () => {
  return useQuery({
    queryKey: ['treeDensity'],
    queryFn: async () => {
      const response = await fetch('/api/treeDensity');
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};
