import mapboxgl from "mapbox-gl"
import "turf"

// manage popups for parcelle not registered
class PopupsManager {
  show(parcelle) {
    if (!parcelle.isRegistered) {
      const popup = new mapboxgl.Popup({
        className: 'mapboxgl-popup-content-custom',
        closeButton: true,
        closeOnClick: true,
        focusAfterOpen: false,
        offset: 10
      })
      parcelle.map.getCanvas().style.cursor = 'pointer'
      parcelle.popup = popup
      popup
        .setLngLat(parcelle.getCentroid())
        .setHTML(new PopupContent(parcelle).create())
        .addTo(parcelle.map)
    }
  }

  remove(parcelle) {
    if (parcelle && parcelle.popup) {
      parcelle.popup.remove()
      parcelle.popup = null
    }
  }
}

class PopupContent {
  constructor(parcelle) {
    this.container = document.createElement('map-popup')

    if (parcelle.getNumero() != 'Z0000') {
      this.content1 = document.createElement('div')
      this.content1.innerHTML = `<strong>Référence:</strong> ${parcelle.getNumero()}`
      this.container.append(this.content1)
    }

    this.container.dataset.controller = 'popup'
    this.content2 = document.createElement('div')
    this.content2.innerHTML = `<strong>Surface:</strong> ${parcelle.properties.contenance / 10000} ha`
    this.container.append(this.content2)

    if (!parcelle.isRegistered &&
      turf.unkinkPolygon(parcelle.polygon).features.length == 1) {
      this.content3 = document.createElement('div')
      this.content3.innerHTML = `<a class="map-link">enregistrer</a>`
      this.content3.dataset.action = 'click->popup#add'
      this.container.append(this.content3)
      this.content4 = document.createElement('map-popup-info')
      this.content4.dataset.infos = parcelle.toJson()
      this.content4.dataset.popupTarget = 'parcelle'
      this.container.append(this.content4)
    }
  }

  create() {
    return this.container.outerHTML
  }
}

function isValid(polygon) {
  lines = []
  polygon
}

export { PopupsManager, PopupContent }
