class CadastreControl {
  onAdd(map) {
    this._map = map
    this._container = document.createElement('div')
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'

    this._button = document.createElement('button')
    this._button.className = 'fa-regular fa-map active-control'
    this._button.title = 'Mode cadastre activé'
    this._container.append(this._button)

    this._container.setAttribute('data-controller', 'button-cadastre')
    this._button.setAttribute('data-button-cadastre-target', 'button')
    this._button.setAttribute('data-action', 'click->button-cadastre#toggle')

    map.cadastreControl = this
    return this._container
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container)
    this._map = undefined
  }

}

export { CadastreControl }
