import mapboxgl from "mapbox-gl"
import { PopupsManager, PopupContent } from "modules/mapbox/functions/popups_manager"

mapboxgl.Map.prototype.addPopupsManager = function() {
  this.popupsManager = new PopupsManager
}

// manage popups for parcelle registered
mapboxgl.Map.prototype.addPopups = function () {

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true,
    offset: 25
  })

  this.parcelles.forEach((parcelle, index) => {
    this.on('mouseenter', 'Background' + index, (e) => {
      this.getCanvas().style.cursor = 'pointer'
      popup
      .setLngLat(parcelle.getCentroid())
      .setHTML(new PopupContent(parcelle).create())
      .addTo(this)
    })

    this.on('mouseleave', 'Background' + index, () => {
      this.getCanvas().style.cursor = ''
      popup.remove()
    })
  })
}
