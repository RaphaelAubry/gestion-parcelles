import mapboxgl from 'mapbox-gl'

mapboxgl.Map.prototype.addPolygons = function (parcelles, options = {}) {
  this.on('load', () => {
    parcelles.forEach((parcelle, index) => {
      let color = parcelle.tag_color == null ? '#0080ff' : parcelle.tag_color

      this.addSource(`${index}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: options.geometryType,
            coordinates: parcelle.coordinates
          }
        }
      })

      this.addLayer({
        id: 'Background' + `${index}`,
        type: 'fill',
        source: `${index}`,
        layout: {},
        paint: {
          'fill-color': color,
          'fill-opacity': 0.75
        }
      })

      this.addLayer({
        id: 'Border' + `${index}`,
        type: 'line',
        source: `${index}`,
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 1
        }
      })
    })
  })
}
