class SearchControl {
  onAdd(map) {
    this._map = map
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl-geocoder mapboxgl-ctrl'
    this._inputEl = document.createElement('input')
    this._inputEl.className = "mapboxgl-ctrl-geocoder--input"
    this._container.append(this._inputEl)
    this._inputEl.placeholder = 'Liste des parcelles'
    this._suggestionsWrapper = document.createElement('div')
    this._suggestionsWrapper.className = "suggestions-wrapper"
    this._suggestions = document.createElement('ul')
    this._suggestions.className = "suggestions"
    this._suggestions.style.display = "none"
    this._suggestionsWrapper.append(this._suggestions)
    this._container.append(this._suggestionsWrapper)

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
