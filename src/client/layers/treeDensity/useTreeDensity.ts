import { useQuery } from '@tanstack/react-query';

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
