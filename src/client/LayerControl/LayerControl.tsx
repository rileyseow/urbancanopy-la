import classNames from 'classnames';
import { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';

import CaretSvg from '@/assets/caret.svg';
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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={classNames('LayerControl', {
        expanded: isExpanded,
      })}
    >
      <button
        className='header'
        onClick={() => setIsExpanded(prev => !prev)}
      >
        <h2>Map Layers</h2>
        <CaretSvg className='caret' />
      </button>
      <LayerControlList />
    </div>
  );
};

export default LayerControl;
