class SearchControl {
  onAdd(map) {
    this._map = map

    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl-geocoder mapboxgl-ctrl search-control'

    this._searchIcon = document.createElement('i')
    this._searchIcon.className = 'mapboxlgl-control-icon search fa fa-light fa-magnifying-glass'
    this._container.append(this._searchIcon)

    this._inputEl = document.createElement('input')
    this._inputEl.className = 'mapboxgl-ctrl-geocoder--input'
    this._inputEl.placeholder = 'Chercher une parcelle'
    this._container.append(this._inputEl)

    this._clearIcon = document.createElement('i')
    this._clearIcon.className = 'mapboxlgl-control-icon clear fa-solid fa-xmark'
    this._clearIcon.style.display = "none"
    this._container.append(this._clearIcon)

    this._suggestionsWrapper = document.createElement('div')
    this._suggestionsWrapper.className = 'suggestions-wrapper'
    this._container.append(this._suggestionsWrapper)

    this._suggestions = document.createElement('ul')
    this._suggestions.className = 'suggestions'
    this._suggestions.style.display = 'none'
    this._suggestionsWrapper.append(this._suggestions)


    return this._container
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container)
    this._map = undefined
  }

  reset() {
    this._suggestions.innerHTML = ''
  }
}

export { SearchControl }
