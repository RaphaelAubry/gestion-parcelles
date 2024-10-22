import mapboxgl from "mapbox-gl"
import { PopupsManager } from "modules/mapbox/functions/popups_manager"

mapboxgl.Map.prototype.addPopupsManager = function() {
  this.popupsManager = new PopupsManager
}

mapboxgl.Map.prototype.addPopups = function (parcelles) {

  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: true,
    offset: 50
  })

  this.parcelles.forEach((parcelle, index) => {
    this.on('mouseenter', 'Background' + index, (e) => {
      this.getCanvas().style.cursor = 'pointer'
      popup
      .setLngLat(parcelle.getCentroid())
      .setHTML(parcelle.getDescription())
      .addTo(this)
    })

    this.on('mouseleave', 'Background' + index, () => {
      this.getCanvas().style.cursor = ''
      popup.remove()
    })
  })
}
