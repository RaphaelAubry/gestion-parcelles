import mapboxgl from "mapbox-gl"
import "mapbox_draw"
import { Parcelle } from "modules/mapbox/geojsons/parcelle"
import { PopupContent } from "modules/mapbox/functions/popups_manager"

mapboxgl.Map.prototype.draws = []
mapboxgl.Map.prototype.addControlDraw = function () {
  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true
    }
  })

  this.addControl(draw)
  this.draw = draw

  document.querySelector('.mapbox-gl-draw_ctrl-draw-btn').classList.add('fa-solid')
  document.querySelector('.mapbox-gl-draw_ctrl-draw-btn').classList.add('fa-draw-polygon')
  document.querySelector('.mapbox-gl-draw_ctrl-draw-btn').classList.remove('mapbox-gl-draw_polygon')
  document.querySelector('.fa-draw-polygon').classList.remove('mapbox-gl-draw_ctrl-draw-btn')
  document.querySelector('.fa-draw-polygon').title = 'Tracer un polygone'
  document.querySelector('.mapbox-gl-draw_trash').title = 'Supprimer'

  this.on('draw.create', updateDraw);
  this.on('draw.delete', updateDraw);
  this.on('draw.update', updateDraw);
}


function updateDraw(event) {

  var id = event.features[0].id

  if (event.type == 'draw.create') {
    const feature = {}
    feature.type = event.features[0].type
    feature.id = event.features[0].id
    feature.properties = event.features[0].properties
    feature.geometry_name = "geom"
    feature.bbox = null

    const geometry = {}
    geometry.type = event.features[0].geometry.type,
    geometry.coordinates = [event.features[0].geometry.coordinates]

    feature.geometry = geometry

    const parcelle = new Parcelle(feature)
    this.draws.push(parcelle)
  }

  if (event.type == 'draw.update') {
    const index = this.draws.findIndex(element => element.id == event.features[0].id)
    const parcelle = this.draws[index]
    parcelle.geometry.coordinates = [event.features[0].geometry.coordinates]
    parcelle.polygon = turf.polygon(parcelle.geometry.coordinates[0])
    this.draws[index] = parcelle
  }

  if (event.type == 'draw.delete') {
    const index = this.draws.findIndex(element => element.id == event.features[0].id)
    this.draws.splice(index, 1)
  }

  this.on('click', 'gl-draw-polygon-fill.cold', (e) => {
      var point = turf.point([e.lngLat.lng, e.lngLat.lat])

      this.draws.forEach(parcelle => {
        var polygon = turf.polygon(parcelle.geometry.coordinates[0])

        parcelle.properties.contenance = Math.round(turf.area(polygon))
        parcelle.centroid = turf.centroid(polygon)
        parcelle.properties.section = 'Z'
        parcelle.properties.numero = '0000'
        if (this.currentCity) {
          parcelle.properties.code_insee = this.currentCity.properties.code_insee
        } else {
          parcelle.properties.code_insee = ''
        }

        if (turf.booleanPointInPolygon(point, polygon)) {
          const popup = new mapboxgl.Popup({
            className: 'mapboxgl-popup-content-custom',
            closeButton: true,
            focusAfterOpen: false,
            offset: 10
          })
          parcelle.popup = popup
          popup
            .setLngLat(parcelle.getCentroid())
            .setHTML(new PopupContent(parcelle).create())
            .addTo(this)
        }
      })
  })
}
