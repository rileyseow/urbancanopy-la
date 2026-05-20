import { useQuery } from '@tanstack/react-query';

export const useParksPoints = () => {
  return useQuery({
    queryKey: ['parks', 'points'],
    queryFn: async () => {
      const response = await fetch('/api/poi/parks/points');
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};

export const useParksPolygons = () => {
  return useQuery({
    queryKey: ['parks', 'polygons'],
    queryFn: async () => {
      const response = await fetch(
        '/api/poi/parks/polygons'
      );
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};
