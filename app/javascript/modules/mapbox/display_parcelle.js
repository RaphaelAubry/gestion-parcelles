import mapboxgl from "mapbox-gl"

mapboxgl.Map.prototype.displayParcelle = function () {
  this.on('mousemove', (e) => {
    if (this.city) {
    this.city.feuilles.forEach(feuille =>{
      feuille.parcelles.forEach(parcelle => {
        parcelle.includes(e.lngLat)
      })
    })
    }
  })

}
