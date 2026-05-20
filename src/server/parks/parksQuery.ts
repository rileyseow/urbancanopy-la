interface OverpassBbox {
  lng1: number;
  lat1: number;
  lng2: number;
  lat2: number;
}

const parksQuery = ({
  lng1,
  lat1,
  lng2,
  lat2,
}: OverpassBbox) => {
  return `
[out:json][timeout:25];

(
  nwr["leisure"="park"](${lat1},${lng1},${lat2},${lng2});
  nwr["landuse"="recreation_ground"](${lat1},${lng1},${lat2},${lng2});
  nwr["boundary"="national_park"](${lat1},${lng1},${lat2},${lng2});
  nwr["leisure"="garden"](${lat1},${lng1},${lat2},${lng2});
);

out geom;
  `;
};

export default parksQuery;
