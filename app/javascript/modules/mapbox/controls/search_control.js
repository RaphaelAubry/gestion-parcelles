class SearchControl {
  onAdd(map) {
    const containerElement = document.createElement('div')
    const titleElement = document.createElement('div')
    this._map = map
    this._container = containerElement
    this._title = this._container.appendChild(titleElement)
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'
    this._container.classList.add('info-control')
    this._title.innerHTML = 'Recherche'
    return this._container
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container)
    this._map = undefined
  }
}
