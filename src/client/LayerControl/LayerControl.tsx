import EnvironmentLayerControl from '@/client/LayerControl/EnvironmentLayerControl';
import POILayerControl from '@/client/LayerControl/POILayerControl';
import useMapStore from '@/stores/useMapStore';

import './LayerControl.scss';

const LayerControl = () => {
  const visibleLayers = useMapStore(s => s.visibleLayers);
  const setIsLayerVisible = useMapStore(
    s => s.setIsLayerVisible
  );

  return (
    <div className='LayerControl'>
      <POILayerControl
        visibleLayers={visibleLayers}
        setIsLayerVisible={setIsLayerVisible}
      />
      <EnvironmentLayerControl
        setIsLayerVisible={setIsLayerVisible}
      />
    </div>
  );
};

export default LayerControl;
