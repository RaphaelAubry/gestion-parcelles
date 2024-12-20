import { Controller } from "@hotwired/stimulus"


export default class extends Controller {
  static targets = ['search', 'geocoder', 'numero', 'clear']

  connect() {
    this.geocoderTarget.addEventListener('focus', e => {
      this.searchTarget.parentElement.style.display = "none"
      document.map.searchControl._suggestions.style.display = "none"
    })
    this.geocoderTarget.addEventListener('focusout', e => {
      this.searchTarget.parentElement.style.display = ""
    })
    this.searchTarget.addEventListener('focus', e => {
      document.map.searchControl._suggestions.style.zIndex = "2000"
      if (this.searchTarget.value != "") {
        this.#find(e.target.value)
      }
    })
    this.searchTarget.addEventListener('keyup', e => {
      this.#find(e.target.value)
      if (e.target.value != "") {
        this.clearTarget.style.display = "flex"
      } else {
        this.clearTarget.style.display = "none"
      }
    })
    document.map.searchControl._suggestions.addEventListener('mouseleave', e => {
      document.map.searchControl._suggestions.style.display = "none"
    })
  }

  #find(value) {
    document.map.searchControl.reset()
    if (document.map.currentCity) {
      document.map.currentCity.sortParcelles()
      document.map.currentCity.parcelles
        .filter(parcelle => parcelle.getNumero().match(value))
        .forEach(parcelle => this.#feed(parcelle))
      document.map.searchControl._suggestions.style.display = "block"
      document.map.searchControl._suggestions.style.overflowY = "scroll"
      document.map.searchControl._suggestions.style.maxHeight = (document.map._containerHeight * 0.75).toString() + "px"
    }
  }

  #feed(item) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')

    li.id = item.id
    li.setAttribute('data-action', 'click->input-mapbox#flyTo')
    div1.classname = "mapboxgl-ctrl-geocoder--suggestion"
    div2.className = "mapboxgl-ctrl-geocoder--suggestion--title"
    div2.innerText = item.properties.section + item.properties.numero
    div1.append(div2)
    a.append(div1)
    li.append(a)
    document.map.searchControl._suggestions.append(li)
  }

  flyTo(event) {
    const parcelle = document.map.currentCity.parcelles.find(parcelle => parcelle.id == event.currentTarget.id)
    document.map.flyTo({
      center: parcelle.centroid.geometry.coordinates,
      zoom: 15,
      essential: true
    })

    const source = document.map.getSource('current parcelle')
    if (source) {
      source.setData({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: parcelle.geometry.coordinates[0]
        }
      })
      if (document.map.currentParcelleChanged(parcelle)) {
        document.map.popupsManager.remove(document.map.currentParcelle)
        document.map.currentParcelle = parcelle
        document.map.popupsManager.show(parcelle)
      }
    }
    document.map.fitBounds(parcelle.bbox)
  }

  clear() {
    this.searchTarget.value = ""
    document.map.searchControl._suggestions.style.display = "none"
  }
}
