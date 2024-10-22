import mapboxgl from "mapbox-gl"

mapboxgl.Map.prototype.currentParcelle = null

mapboxgl.Map.prototype.hasCurrentParcelle = function() {
  return this.currentParcelle != null
}

mapboxgl.Map.prototype.currentParcelleChanged = function(parcelle) {
  return this.currentParcelle != parcelle
}

mapboxgl.Map.prototype.displayCurrentParcelle = function() {
  this.on('mousemove', (e) => {
    if (this.currentCity && this.currentCity.feuilles) {
      this.currentCity.feuilles.forEach(feuille =>{
        feuille.parcelles.forEach(parcelle => {
          if (parcelle.includes(e.lngLat)) {
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
        })
      })
    }
  })
}
