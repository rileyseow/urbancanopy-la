import * as Switch from '@radix-ui/react-switch';

import { LAYERS } from '@/constants/LAYERS';
import useMapStore from '@/stores/useMapStore';

import './LayerControl.scss';

const LayerControlList = () => {
  const visibleLayers = useMapStore(s => s.visibleLayers);
  const toggleLayer = useMapStore(s => s.toggleLayer);

  return (
    <div className='LayerControlList'>
      {LAYERS.map(({ icon: Icon, id, label }) => (
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
  );
};

const LayerControl = () => {
  return (
    <div className='LayerControl'>
      <h2>Map Layers</h2>
      <LayerControlList />
    </div>
  );
};

export default LayerControl;
