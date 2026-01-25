import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"
import "modules/mapbox/functions"
import "modules/mapbox/controls"
import { getMapboxToken } from "modules/requests"

export default class extends Controller {
  static targets = ['map']

  async connect() {

    mapboxgl.accessToken = await getMapboxToken()

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: this.#center(),
      zoom: 12
    })
    document.map = map
    
    map.addControlFullscreen()
    map.addControlGeolocate()
    map.addControlCadastre()
    map.addControlDraw()

    map.addInputs('top-left')

    map.on('style.load', () => {
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 15
      })
      map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 })
      map.addSourceCurrentCity()
      map.addSourceCurrentParcelle()
    })

    if (this.mapTarget.dataset.parcelles) {
      const geometryType = this.mapTarget.dataset.geometryType
      const parcelles = JSON.parse(this.mapTarget.dataset.parcelles)
      map.addPolygons(parcelles, { geometryType: geometryType })
      map.addParcelles(parcelles)
      map.addPopups(parcelles)
    }

    map.addPopupsManager()
    map.initializeCurrentCity()
    map.displayCurrentCity()
    map.displayCurrentParcelle()
    map.fit()
  }

  #center() {
    try {
      if (this.mapTarget.dataset.parcelles) {
        return JSON.parse(this.mapTarget.dataset.centroid)
      } else {
        //Paris
        return [2.333333, 48.866667]
      }
    } catch (error) {
     console.log(error.message)
    }
  }
}
