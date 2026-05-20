import { useEffect, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';

type MapImageProps = {
  id: string;
  src: string;
};

const useMapImage = ({ id, src }: MapImageProps) => {
  const { current: map } = useMap();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (map.hasImage(id)) {
      setIsLoaded(true);
      return;
    }

    const img = new Image(64, 64);

    img.onload = () => {
      if (!map.hasImage(id)) {
        map.addImage(id, img);
      }
      setIsLoaded(true);
    };

    img.onerror = error => {
      console.error(error);
    };

    img.src = src;
  }, [map, id, src]);

  return isLoaded;
};

export default useMapImage;
