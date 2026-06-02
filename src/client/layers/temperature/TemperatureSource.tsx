import { Source } from 'react-map-gl/maplibre';

const OPEN_METEO_TEMPERATURE_TILE_URL = `https://map-tiles.open-meteo.com/data_spatial/dwd_icon/latest.json?time_step=current_time_1H&variable=temperature_2m`;

const TemperatureSource = () => {
  return (
    <>
      <Source
        id='temperature-source'
        type='raster'
        url={`om://${OPEN_METEO_TEMPERATURE_TILE_URL}`}
      />
      <Source
        id='temperature-labels-source'
        type='vector'
        url={`om://${OPEN_METEO_TEMPERATURE_TILE_URL}&grid=true`}
      />
    </>
  );
};

export default TemperatureSource;
