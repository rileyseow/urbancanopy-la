import * as Switch from '@radix-ui/react-switch';

import { ENVIRONMENT_LAYERS } from '@/constants/ENVIRONMENT_LAYERS';
import { type LayerId } from '@/constants/LAYERS';
import { POI_LAYERS } from '@/constants/POI_LAYERS';
import useMapStore from '@/stores/useMapStore';

import './LayerControl.scss';

const POILayerControl = ({
  visibleLayers,
  toggleLayer,
}: {
  visibleLayers: Record<LayerId, boolean>;
  toggleLayer: (id: LayerId) => void;
}) => {
  return (
    <div className='POILayerControl'>
      <h2>Public Spaces & Amenities</h2>
      <div className='LayerControlList'>
        {POI_LAYERS.map(({ icon: Icon, id, label }) => (
          <div key={id} className='item'>
            <div className='left'>
              <Icon className='icon' />
              <span>{label}</span>
            </div>
            <Switch.Root
              checked={visibleLayers[id]}
              onCheckedChange={() => toggleLayer(id)}
              className='switch'
            >
              <Switch.Thumb className='thumb' />
            </Switch.Root>
          </div>
        ))}
      </div>
    </div>
  );
};

const EnvironmentLayerControl = ({
  visibleLayers,
  toggleLayer,
}: {
  visibleLayers: Record<LayerId, boolean>;
  toggleLayer: (id: LayerId) => void;
}) => {
  return (
    <div className='EnvironmentLayerControl'>
      <h2>Environmental Analysis</h2>
      <div className='LayerControlList'>
        {ENVIRONMENT_LAYERS.map(
          ({ icon: Icon, id, label }) => (
            <div key={id} className='item'>
              <div className='left'>
                <Icon className='icon' />
                <span>{label}</span>
              </div>
              <Switch.Root
                checked={visibleLayers[id]}
                onCheckedChange={() => toggleLayer(id)}
                className='switch'
              >
                <Switch.Thumb className='thumb' />
              </Switch.Root>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const LayerControl = () => {
  const visibleLayers = useMapStore(s => s.visibleLayers);
  const toggleLayer = useMapStore(s => s.toggleLayer);

  return (
    <div className='LayerControl'>
      <POILayerControl
        visibleLayers={visibleLayers}
        toggleLayer={toggleLayer}
      />
      <EnvironmentLayerControl
        visibleLayers={visibleLayers}
        toggleLayer={toggleLayer}
      />
    </div>
  );
};

export default LayerControl;
