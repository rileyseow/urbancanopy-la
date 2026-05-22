import { useEffect, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';

type MapImage = {
  id: string;
  src: string;
};

/**
 * Custom hook to add images to a MapLibre map style and track loading states.
 *
 * @param images - Array of image objects with ID and source URL
 *
 * @returns A boolean indicating whether all images are loaded
 */
const useMapImage = (images: MapImage[]) => {
  const { current: map } = useMap();

  const [areLoaded, setAreLoaded] = useState<
    Set<MapImage['id']>
  >(new Set());

  useEffect(() => {
    if (!map) {
      return;
    }

    images.forEach(({ id, src }) => {
      if (map.hasImage(id)) {
        setAreLoaded(prev => new Set(prev).add(id));
        return;
      }

      const img = new Image(64, 64);

      img.onload = () => {
        if (!map.hasImage(id)) {
          map.addImage(id, img);
        }
        setAreLoaded(prev => new Set(prev).add(id));
      };

      img.onerror = error => {
        console.error(error);
      };

      img.src = src;
    });
  }, [map, images]);

  return images.every(image => areLoaded.has(image.id));
};

export default useMapImage;
