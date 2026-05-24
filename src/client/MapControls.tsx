import {
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl/maplibre';

import LayerControl from '@/client/LayerControl';
import SiteLogo from '@/client/SiteLogo';

const MapControls = () => {
  const handleOutOfMaxBounds = () => {
    alert('You are outside the maximum bounds of the map.');
  };

  return (
    <>
      <SiteLogo />
      <LayerControl />
      <NavigationControl
        position='top-right'
        showZoom
        showCompass
        visualizePitch
        visualizeRoll
      />
      <GeolocateControl
        position='top-right'
        positionOptions={{ enableHighAccuracy: true }}
        onOutOfMaxBounds={handleOutOfMaxBounds}
      />
      <ScaleControl
        position='bottom-right'
        unit='imperial'
      />
    </>
  );
};

export default MapControls;
