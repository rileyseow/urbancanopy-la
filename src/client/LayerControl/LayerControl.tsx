import EnvironmentLayerControl from '@/client/LayerControl/EnvironmentLayerControl';
import POILayerControl from '@/client/LayerControl/POILayerControl';
import useMapStore from '@/stores/useMapStore';

import './LayerControl.scss';

const LayerControl = () => {
  const visibleLayers = useMapStore(s => s.visibleLayers);
  const setVisibleLayer = useMapStore(
    s => s.setVisibleLayer
  );

  return (
    <div className='LayerControl'>
      <POILayerControl
        visibleLayers={visibleLayers}
        setVisibleLayer={setVisibleLayer}
      />
      <EnvironmentLayerControl
        setVisibleLayer={setVisibleLayer}
      />
    </div>
  );
};

export default LayerControl;
