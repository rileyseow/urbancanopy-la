import {
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl/maplibre';

import LayerControl from '@/client/LayerControl';
import LocationInsights from '@/client/LocationInsights';
import SiteLogo from '@/client/SiteLogo';

import './MapControls.scss';

const MapControls = () => {
  const handleOutOfMaxBounds = () => {
    alert('You are outside the maximum bounds of the map.');
  };

  return (
    <div className='MapControls'>
      <SiteLogo />
      <LayerControl />
      <LocationInsights />
      <GeolocateControl
        position='top-right'
        positionOptions={{ enableHighAccuracy: true }}
        onOutOfMaxBounds={handleOutOfMaxBounds}
      />
      <NavigationControl
        position='top-right'
        showZoom
        showCompass
        visualizePitch
        visualizeRoll
      />
      <ScaleControl
        position='bottom-right'
        unit='imperial'
      />
    </div>
  );
};

export default MapControls;
