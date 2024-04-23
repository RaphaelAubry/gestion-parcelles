import { Controller } from "@hotwired/stimulus"
import mapboxgl from 'mapbox-gl';

export default class extends Controller {
  static targets = ['map']

  connect() {

    mapboxgl.accessToken = 'pk.eyJ1IjoicmFwaGFlbGF1YnJ5IiwiYSI6ImNsdWh4aWdhYTE0enQybHJvM2tzNXA2cTMifQ.dhp8bVAsFt9MO-eeFGGY0Q'

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: this.#center(),
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
    map.on('style.load', () => {
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 15
      });
      // add the DEM source as a terrain layer with exaggerated height
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    });

    const geometryType = this.mapTarget.dataset.geometryType
    const parcelles = JSON.parse(this.mapTarget.dataset.parcelles)

    map.on('load', () => {
      parcelles.forEach((parcelle, index) => {
        let color = parcelle.tag_color == null ? '#0080ff' : parcelle.tag_color
        this.#addPolygon(map, `${index}`, color, geometryType, parcelle.coordinates)
      })
    })
  }

  #addPolygon(map, source, color, geometryType, coordinates) {
      map.addSource(source, {
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
        'id': 'Background' + source,
        'type': 'fill',
        'source': source,
        'layout': {},
        'paint': {
          'fill-color': color,
          'fill-opacity': 0.75
        }
      })

      map.addLayer({
        'id': 'Border' + source,
        'type': 'line',
        'source': source,
        'layout': {},
        'paint': {
          'line-color': '#000',
          'line-width': 1
        }
      })
  }

  #center() {
    try {
      return JSON.parse(this.mapTarget.dataset.centroid)
    } catch (error) {
      // error comes from centroid format must be [float, float]
      // from average coordinates x and y of polygons
      // Mont-Blanc coordinates
      return [6.865575, 45.832119]
    }
  }
}
