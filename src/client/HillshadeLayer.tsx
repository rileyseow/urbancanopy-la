import { Layer, Source } from 'react-map-gl/maplibre';

import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const HillshadeSource = () => {
  return (
    <Source
      id='hillshade-source'
      type='raster'
      tiles={[
        'https://tiles.openstreetmap.us/raster/hillshade/{z}/{x}/{y}.jpg',
      ]}
      maxzoom={11}
      attribution='Hillshade tiles by <a href="https://tiles.openstreetmap.us/" target="_blank">OSM US</a>'
    />
  );
};

const HillshadeLayer = () => {
  return (
    <Layer
      id={MAP_LAYER_IDS.hillshade}
      source='hillshade-source'
      type='raster'
      paint={{
        'raster-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          12,
          0.2,
          14,
          0,
        ],
      }}
    />
  );
};

export default () => {
  return (
    <>
      <HillshadeSource />
      <HillshadeLayer />
    </>
  );
};
