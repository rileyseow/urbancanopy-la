import { Layer } from 'react-map-gl/maplibre';

import { PARKS_SYMBOL_MAX_ZOOM } from '@/constants/MAP';
import { MAP_LAYER_IDS } from '@/constants/MAP_LAYER_IDS';

const ParksLayer = () => {
  return (
    <>
      <Layer
        id={MAP_LAYER_IDS.parks}
        source='parks-source'
        type='fill'
        filter={[
          'any',
          ['==', ['geometry-type'], 'Polygon'],
          ['==', ['geometry-type'], 'MultiPolygon'],
          ['==', ['geometry-type'], 'LineString'],
        ]}
        paint={{
          'fill-color': '#3e8e5a',
          'fill-opacity': 0.4,
        }}
      />
      <Layer
        id={MAP_LAYER_IDS.parksSymbol}
        source='parks-source'
        type='symbol'
        maxzoom={PARKS_SYMBOL_MAX_ZOOM}
        filter={['<', ['get', 'acres'], 5]}
        layout={{
          'icon-image': 'park-icon',
          'icon-size': 0.3,
          'icon-allow-overlap': true,
          'symbol-placement': 'point',
        }}
      />
    </>
  );
};

export default ParksLayer;
