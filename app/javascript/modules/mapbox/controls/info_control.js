class InfoControl {
  onAdd(map) {
    this._map = map
    this._container = document.createElement('div')
    this._town = document.createElement('div')
    this._container.append(this._town)
    this._town.innerText = 'Commune :'
    this._status = document.createElement('div')
    this._container.append(this._status)
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group info-control'
    map.infoControl = this
    return this._container
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container)
    this._map = undefined
  }

  town(city) {
    this._town.innerHTML = 'Commune: ' + '<strong>' + city.properties.nom_com + '</strong>'
  }
}

export { InfoControl }
