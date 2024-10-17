import mapboxgl from 'mapbox-gl'

mapboxgl.Map.prototype.addSourceCity = function () {
  this.on('load', (e) => {
    this.addSource('city', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[]]
        }
      }
    })
    this.addLayer({
      id: 'city 1',
      type: 'line',
      source: 'city',
      layout: {},
      paint: {
        'line-color': '#000',
        'line-width': 3
      }
    })
  })
}
