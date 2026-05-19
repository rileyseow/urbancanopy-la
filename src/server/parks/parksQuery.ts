const parksQuery = () => {
  return `
[out:json][timeout:25];

(
  nwr["leisure"="park"](33.6,-118.9,34.4,-117.6);
  nwr["landuse"="recreation_ground"](33.6,-118.9,34.4,-117.6);
  nwr["boundary"="national_park"](33.6,-118.9,34.4,-117.6);
  nwr["leisure"="garden"](33.6,-118.9,34.4,-117.6);
);

out geom;
  `;
};

export default parksQuery;
