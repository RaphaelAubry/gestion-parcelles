import * as Requests from '../../requests/index'

class InfoControl {
  onAdd(map) {
    const containerElement = document.createElement('div')
    const titleElement = document.createElement('div')
    const townElement = document.createElement('div')
    this._map = map
    this._container = containerElement
    this._title = this._container.appendChild(titleElement)
    this._town = this._container.insertAdjacentElement('beforeend', townElement)
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'
    this._container.classList.add('info-control')
    this._title.innerHTML = 'Informations'
    map.infoControlManager(this)
    return this._container
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container)
    this._map = undefined
  }

  town(point) {
    Requests.getCodeINSEE(point)
      .then(codeINSEE => {
        Requests.getAPICarto({ code_insee: codeINSEE }, { type: 'commune' })
          .then(data => {
            if (data != undefined) {
              this._town.innerHTML = 'Commune: ' + '<strong>' + data.features[0].properties.nom_com + '</strong>'
            }
          })
          .catch(error => {
            console.log(error.message)
          })
      })
  }
}

export { InfoControl }
