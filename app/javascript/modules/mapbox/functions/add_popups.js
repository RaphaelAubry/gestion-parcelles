import mapboxgl from "mapbox-gl"
import { PopupsManager, PopupContent } from "modules/mapbox/functions/popups_manager"

mapboxgl.Map.prototype.addPopupsManager = function() {
  this.popupsManager = new PopupsManager
}

mapboxgl.Map.prototype.addPopups = function () {
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false, // clé pour mobile : ne pas fermer au tap
    offset: 10
  })

  this.parcelles.forEach((parcelle, index) => {
    // Hover uniquement desktop
    if (!('ontouchstart' in window)) {
      this.on('mouseenter', 'background' + index, () => {
        this.getCanvas().style.cursor = 'pointer'
      })

      this.on('mouseleave', 'background' + index, () => {
        this.getCanvas().style.cursor = ''
        popup.remove()
      })

    }

    for (let event of ['click', 'touchend']) {
      this.on(event, 'background' + index, (e) => {
        e.preventDefault()
        e.originalEvent.stopPropagation()

        // Affiche la popup
        popup
          .setLngLat(parcelle.getCentroid())
          .setHTML(new PopupContent(parcelle).create())
          .addTo(this)
      })
    }
  })
}