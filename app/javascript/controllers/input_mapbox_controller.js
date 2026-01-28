import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  
  connect() {
    console.log('connect input')
    
    this.onMapReady = e => {
      console.log('map ready received')
    
      this.map = e.detail.map
      this.suggestions = e.detail.searchControl._suggestions
      this.geocoder = e.detail.geocoder._inputEl
      this.search = e.detail.searchControl._inputEl
      this.searchClearIcon = e.detail.searchControl._clearIcon
      this._bindEvents()
    }
     
    this.onMapReady(window._mapReadyEvent)
    
    document.addEventListener('map:ready', this.onMapReady)
  }

  disconnect() {
    console.log('disconnect input')

    document.removeEventListener('map:ready', this.onMapReady)

    this.geocoder?.removeEventListener('focus', this.onGeocoderFocus)
    this.geocoder?.removeEventListener('focusout', this.onGeocoderBlur)

    this.search?.removeEventListener('focus', this.onSearchFocus)
    this.search?.removeEventListener('click', this.onSearchClick)
    this.search?.removeEventListener('keyup', this.onSearchKeyUp)

    this.suggestions?.removeEventListener('mouseleave', this.onSuggestionsLeave)
    this.suggestions?.removeEventListener('click', this.onSuggestionClick)

    this.searchClearIcon?.removeEventListener('click', this.onSearchClearIconClick)
  }

  _bindEvents() {
    console.log('input mapbox events bound')

    this.onGeocoderFocus = () => {
      this.search.parentElement.style.display = 'none'
      this.suggestions.style.display = 'none'
    }

    this.onGeocoderBlur = () => {
      this.search.parentElement.style.display = ''
    }

    this.onSearchFocus = (e) => {
      this.#fill()
      this.suggestions.style.zIndex = '2000'
      if (this.search.value != '') this.#find(e.target.value);
      if (this.suggestions.childElementCount > 0) this.suggestions.style.display = ''
    }

    this.onSearchClick = () => {
      this.suggestions.style.zIndex = '2000'
      if (this.suggestions.childElementCount > 0) this.suggestions.style.display = ''
    }

    this.onSearchKeyUp = (e) => {
      this.#find(e.target.value)
      this.searchClearIcon.style.display = (e.target.value != '') ? 'flex' : 'none'
    }

    this.onSuggestionsLeave = () => {
      this.suggestions.style.display = 'none'
    }

    this.onSuggestionClick = (e) => {
      const li = e.target.closest('li')
      if (!li) return
      this.flyTo({ currentTarget: li, originalTarget: li })
    }

    this.onSearchClearIconClick = (e) => {
      this.search.value = ''
      this.searchClearIcon.style.display = 'none'
      this.suggestions.style.display = 'none'
    }

    this.geocoder.addEventListener('focus', this.onGeocoderFocus)
    this.geocoder.addEventListener('focusout', this.onGeocoderBlur)

    this.search.addEventListener('focus', this.onSearchFocus)
    this.search.addEventListener('click', this.onSearchClick)
    this.search.addEventListener('keyup', this.onSearchKeyUp)

    this.suggestions.addEventListener('mouseleave', this.onSuggestionsLeave)
    this.suggestions.addEventListener('click', this.onSuggestionClick)

    this.searchClearIcon.addEventListener('click', this.onSearchClearIconClick)
  }

  #parcelles() {
    if (this.map._container.dataset.viewType == 'carte') {
      return this.map.parcelles || []
    }

    const city = this.map?.currentCity
    if (!city) return []

    city.removeDuplicates()
    city.sortParcelles()
    return city.parcelles || []
  }

  #fill() {
    const control = this.map.searchControl

    control.reset()
    this.#parcelles().forEach(parcelle => this.#feed(parcelle))
    control._suggestions.style.overflowY = 'scroll'
    control._suggestions.style.maxHeight = (this.map._containerHeight * 0.75).toString() + 'px'
  }

  #find(value) {
    const control = this.map.searchControl

    control.reset()
    this.#parcelles()
      .filter(parcelle => parcelle.getNumero().match(value))
      .forEach(parcelle => this.#feed(parcelle))

    control._suggestions.style.display = 'block'
    control._suggestions.style.overflowY = 'scroll'
    control._suggestions.style.maxHeight = (this.map._containerHeight * 0.75).toString() + 'px'
  }

  #feed(item) {
    const suggestions = this.map.searchControl._suggestions
    const li = document.createElement('li')
    const a = document.createElement('a')
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')

    li.id = item.id
    div1.className = 'mapboxgl-ctrl-geocoder--suggestion'
    div2.className = 'mapboxgl-ctrl-geocoder--suggestion--title'
    div2.innerText = item.properties.section + item.properties.numero
    div1.append(div2)
    a.append(div1)
    li.append(a)
    suggestions.append(li)
  }

  flyTo(event) {
    const map = this.map

    const parcelles = (map._container.dataset.viewType != 'carte')
      ? map.currentCity.parcelles
      : map.parcelles

    const parcelle = parcelles.find(p => p.id == event.currentTarget.id)

    map.flyTo({
      center: parcelle.centroid.geometry.coordinates,
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

    if (parcelle.bbox) {
      map.fitBounds(parcelle.bbox, { padding: 10 })
    }

    this.#updateSearch(event)
  }

  #updateSearch(event) {
    this.search.value = event.originalTarget.innerText
    this.searchClearIcon.style.display = 'flex'
  }
}
