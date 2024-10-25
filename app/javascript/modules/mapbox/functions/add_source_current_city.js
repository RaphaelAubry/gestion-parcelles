import mapboxgl from "mapbox-gl"

mapboxgl.Map.prototype.addSourceCurrentCity = function() {
    this.addSource('current city', {
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
      id: 'Border_current_city_1',
      type: 'line',
      source: 'current city',
      layout: {},
      paint: {
        'line-color': '#FFFFFF',
        'line-width': 3
      }
    })
}
