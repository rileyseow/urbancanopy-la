import { useQuery } from '@tanstack/react-query';

const useIceCream = () => {
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

export default useIceCream;
