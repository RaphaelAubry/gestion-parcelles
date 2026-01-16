import { Controller } from '@hotwired/stimulus'


export default class extends Controller {
  static targets = ['search', 'geocoder', 'numero', 'clear1', 'clear2']

  connect() {
    const suggestions = document.map.searchControl._suggestions

    this.geocoderTarget.addEventListener('focus', e => {
      this.searchTarget.parentElement.style.display = 'none'
      suggestions.style.display = 'none'
    })
    this.geocoderTarget.addEventListener('focusout', e => {
      this.searchTarget.parentElement.style.display = ''
    })

    this.searchTarget.addEventListener('focus', e => {
      this.#fill()
      suggestions.style.zIndex = '2000'
      if (this.searchTarget.value != '') this.#find(e.target.value);
      if (suggestions.childElementCount > 0) suggestions.style.display = '';
    })

    this.searchTarget.addEventListener('click', e => {
      suggestions.style.zIndex = '2000'
      if (suggestions.childElementCount > 0) suggestions.style.display = '';
    })

    this.searchTarget.addEventListener('keyup', e => {
      this.#find(e.target.value)
      this.clear2Target.style.display = (e.target.value != '') ? 'flex' : 'none'
    })

    suggestions.addEventListener('mouseleave', e => {
      suggestions.style.display = 'none'
    })
  }

  #fill() {
    const city = document.map.currentCity
    const control = document.map.searchControl

    control.reset()
    if (city) {
      city.sortParcelles()
      city.parcelles.forEach(parcelle => this.#feed(parcelle))
      control._suggestions.style.overflowY = 'scroll'
      control._suggestions.style.maxHeight = (document.map._containerHeight * 0.75).toString() + 'px'
    }
  }

  #find(value) {
    const city = document.map.currentCity
    const control = document.map.searchControl

    control.reset()
    if (city) {
      city.sortParcelles()
      city.parcelles
        .filter(parcelle => parcelle.getNumero().match(value))
        .forEach(parcelle => this.#feed(parcelle))
      control._suggestions.style.display = 'block'
      control._suggestions.style.overflowY = 'scroll'
      control._suggestions.style.maxHeight = (document.map._containerHeight * 0.75).toString() + 'px'
    }
  }

  #feed(item) {
    const suggestions = document.map.searchControl._suggestions
    const li = document.createElement('li')
    const a = document.createElement('a')
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')

    li.id = item.id
    li.setAttribute('data-action', 'click->input-mapbox#flyTo')
    div1.classname = 'mapboxgl-ctrl-geocoder--suggestion'
    div2.className = 'mapboxgl-ctrl-geocoder--suggestion--title'
    div2.innerText = item.properties.section + item.properties.numero
    div1.append(div2)
    a.append(div1)
    li.append(a)
    suggestions.append(li)
  }

  flyTo(event) {
    const map = document.map
    const parcelle = document.map.currentCity.parcelles.find(parcelle => parcelle.id == event.currentTarget.id)

    map.flyTo({
      center: parcelle.centroid.geometry.coordinates,
      zoom: 15,
      essential: true
    })

    const source = map.getSource('current-parcelle')
    if (source) {
      source.setData({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: parcelle.geometry.coordinates[0]
        }
      })
      if (map.currentParcelleChanged(parcelle)) {
        map.popupsManager.remove(map.currentParcelle)
        map.currentParcelle = parcelle
        map.popupsManager.show(parcelle)
      }
    }

    if (parcelle.bbox && parcelle.bbox.length === 2) {
      map.fitBounds(parcelle.bbox, { padding: 20 })
    }

    this.#updateSearch(event)
  }

  #updateSearch(event) {
    console.log(event)
    this.searchTarget.value = event.originalTarget.innerText
    this.clear2Target.style.display = 'flex'
  }

  clear2() {
    this.searchTarget.value = ''
    this.clear2Target.style.display = 'none'
    document.map.searchControl._suggestions.style.display = 'none'
  }
}
