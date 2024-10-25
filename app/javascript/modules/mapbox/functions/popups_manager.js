import mapboxgl from "mapbox-gl"

class PopupsManager {
  show(parcelle) {
    if (!parcelle.fromDB()) {
      const popup = new mapboxgl.Popup({
        className: 'mapboxgl-popup-content-custom',
        closeButton: true,
        closeOnClick: true,
        offset: 25
      })
      parcelle.map.getCanvas().style.cursor = 'pointer'
      parcelle.popup = popup
      popup
        .setLngLat(parcelle.getCentroid())
        .setHTML(parcelle.getDescription())
        .addTo(parcelle.map)
    }
  }

  remove(parcelle) {
    if (parcelle && parcelle.popup) {
      parcelle.popup.remove()
      parcelle.popup = null
    }
  }
}

export { PopupsManager }
