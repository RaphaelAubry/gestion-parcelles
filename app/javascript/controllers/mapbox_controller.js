import { Controller } from "@hotwired/stimulus"
import mapboxgl from "mapbox-gl"
import "modules/mapbox/functions"
import "modules/mapbox/controls"
import { getMapboxToken } from "modules/requests"

export default class extends Controller {
  static targets = ['map']

  async connect() {
    console.log('connect map')
    
    mapboxgl.accessToken = await getMapboxToken()

    

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: this.#center(),
      zoom: 12
    })
    
    this.map.on('style.load', () => {
      this.map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        zoom: 12
      })
      this.map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 })
      this.map.addSourceCurrentCity()
      this.map.addSourceCurrentParcelle()
    })

    if (this.mapTarget.dataset.parcelles) {
      const geometryType = this.mapTarget.dataset.geometryType
      const parcelles = JSON.parse(this.mapTarget.dataset.parcelles)
      this.map.addPolygons(parcelles, { geometryType: geometryType })
      this.map.addParcelles(parcelles)
      this.map.addPopups(parcelles)
    }
    
    this.map.addInputs('top-left', mapboxgl.accessToken)
    this.map.addControlFullscreen()
    this.map.addControlGeolocate()
    this.map.addControlDraw()
    if (this.map._container.dataset.viewType != 'carte') { this.map.addControlCadastre() }
    
    this.map.addPopupsManager()
    this.map.initializeCurrentCity()
    this.map.displayCurrentCity()
    if (this.map._container.dataset.viewType != 'carte') { this.map.displayCurrentParcelle() }
    this.map.fit()

    const event = new CustomEvent('map:ready', {
      detail: {
        map: this.map,
        searchControl: this.map.searchControl,
        geocoder: this.map.geocoderControl
      }
    })

    window._mapReadyEvent = event
    document.dispatchEvent(event)
  }

  disconnect() {
    console.log('disconnect map')

    this.connected = false
    this.map?.remove()
  }

  #center() {
    try {
      if (this.mapTarget.dataset.parcelles) {
        return JSON.parse(this.mapTarget.dataset.centroid)
      } else {
        // On démarre à Paris
        return [2.333333, 48.866667]
      }
    } catch (error) {
     console.log(error.message)
    }
  }
}
