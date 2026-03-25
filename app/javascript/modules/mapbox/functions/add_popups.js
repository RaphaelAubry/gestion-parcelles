import mapboxgl from "mapbox-gl"
import { PopupsManager, PopupContent } from "modules/mapbox/functions/popups_manager"

mapboxgl.Map.prototype.addPopupsManager = function() {
  this.popupsManager = new PopupsManager
}

mapboxgl.Map.prototype.addPopups = function () {


  this.parcelles.forEach((parcelle, index) => {
   
    // Hover uniquement desktop
    if (!('ontouchstart' in window)) {
      this.on('mouseenter', 'background' + index, () => {
        this.getCanvas().style.cursor = 'pointer'
      })

      this.on('mouseleave', 'background' + index, () => {
        this.getCanvas().style.cursor = ''
      })
    }

    for (let event of ['click', 'touchend']) {
      this.on(event, 'background' + index, (e) => {
        console.log(parcelle)
        if (!parcelle.popup) {
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false, // clé pour mobile : ne pas fermer au tap
            offset: 10
          })
          popup
            .setLngLat(parcelle.getCentroid())
            .setHTML(new PopupContent(parcelle).create())
            .addTo(this)
          parcelle.popup = popup
         
        } else if (parcelle.popup) {
          parcelle.popup.remove()
          parcelle.popup = null
        }
      })
    }
  })
}
