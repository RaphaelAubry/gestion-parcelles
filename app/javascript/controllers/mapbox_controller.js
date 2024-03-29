import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl';

export default class extends Controller {
  static targets = ['map']

  connect() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFwaGFlbGF1YnJ5IiwiYSI6ImNreXd0b243dTBicTAycHF3eWl0NmFsOGsifQ.lyidIB2GZBCqpr1VUtzqEA';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: JSON.parse(this.mapTarget.dataset.centroid),
      zoom: 15
    });
    map.addControl(new mapboxgl.FullscreenControl())
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
    )

    const geometryType = this.mapTarget.dataset.geometryType
    const coordinates = JSON.parse(this.mapTarget.dataset.coordinates)
    this.#addPolygon(map, geometryType, coordinates)
  }

  #addPolygon(map, geometryType, coordinates) {
    map.on('load', () => {
      map.addSource('parcelle', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': geometryType,
            'coordinates': coordinates
          }
        }
      })

      map.addLayer({
        'id': 'parcelle',
        'type': 'fill',
        'source': 'parcelle',
        'layout': {},
        'paint': {
          'fill-color': '#0080ff',
          'fill-opacity': 0.5
        }
      })

      map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'parcelle',
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 2
        }
      })
    })
  }
}
