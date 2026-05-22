import { useEffect, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';

type MapImage = {
  id: string;
  src: string;
};

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
