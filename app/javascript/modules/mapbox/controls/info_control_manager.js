import mapboxgl from 'mapbox-gl'

mapboxgl.Map.prototype.infoControlManager = function(infoControl) {
  var center = this.getCenter()
  infoControl.town(center)
  this.on('moveend', (e) => {
    var center = this.getCenter()
    infoControl.town(center)
  })
}
