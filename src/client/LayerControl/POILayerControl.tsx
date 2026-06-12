import * as Switch from '@radix-ui/react-switch';

import { type LayerId } from '@/constants/LAYERS';
import { POI_LAYERS } from '@/constants/POI_LAYERS';

const POILayerControl = ({
  visibleLayers,
  setIsLayerVisible,
}: {
  visibleLayers: Record<LayerId, boolean>;
  setIsLayerVisible: (
    id: LayerId,
    isVisible: boolean
  ) => void;
}) => {
  return (
    <div className='POILayerControl'>
      <h2>Public Spaces & Amenities</h2>
      <div className='LayerControlList'>
        {POI_LAYERS.map(({ icon: Icon, id, label }) => (
          <div key={id} className='item'>
            <label className='left' htmlFor={`s_${id}`}>
              <Icon className='icon' />
              <span>{label}</span>
            </label>
            <Switch.Root
              id={`s_${id}`}
              className='switch'
              checked={visibleLayers[id]}
              onCheckedChange={() =>
                setIsLayerVisible(id, !visibleLayers[id])
              }
            >
              <Switch.Thumb className='thumb' />
            </Switch.Root>
          </div>
        ))}
      </div>
    </div>
  );
};

export default POILayerControl;
