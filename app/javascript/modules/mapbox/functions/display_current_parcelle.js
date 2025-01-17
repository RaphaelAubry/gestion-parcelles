import mapboxgl from "mapbox-gl"

mapboxgl.Map.prototype.currentParcelle = null

mapboxgl.Map.prototype.hasCurrentParcelle = function() {
  return this.currentParcelle != null
}

mapboxgl.Map.prototype.currentParcelleChanged = function(parcelle) {
  return this.currentParcelle != parcelle
}

mapboxgl.Map.prototype.displayCurrentParcelle = function() {
  this.on('click', (e) => {
    if (this.cadastreControl._button.title == 'Mode cadastre activé') {
      if (this.currentCity) {
        this.currentCity.parcelles.forEach(parcelle => {
          if (parcelle.includes(e.lngLat)) {
            if (parcelle.isAlreadyDisplayed() == false) {

              const source = this.getSource('current parcelle')
              if (source) {
                source.setData({
                  type: 'Feature',
                  geometry: {
                    type: 'Polygon',
                    coordinates: parcelle.geometry.coordinates[0]
                  }
                })

                if (this.currentParcelleChanged(parcelle)) {
                  this.popupsManager.remove(this.currentParcelle)
                  this.currentParcelle = parcelle
                  this.popupsManager.show(parcelle)
                }
              }
            }
          }
        })
      }
    } else {
      const source = this.getSource('current parcelle')
      if (source) {
        source.setData({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: []
          }
        })
      }

      this.popupsManager.remove(this.currentParcelle)
    }
  })
}
