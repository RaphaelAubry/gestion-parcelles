import mapboxgl from 'mapbox-gl'

mapboxgl.Map.prototype.addPopups = function (parcelles) {

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  })

  parcelles.forEach((parcelle, index) => {
    this.on('mouseenter', 'Background' + index, (e) => {
      this.getCanvas().style.cursor = 'pointer'
      popup.setLngLat(parcelle.centroid).setHTML(description(parcelle)).addTo(this);
    })

    this.on('mouseleave', 'Background' + index, () => {
      this.getCanvas().style.cursor = ''
      popup.remove()
    })
  })

}

const description = (parcelle) => {
  return `Référence: ${parcelle.attributes.reference_cadastrale}<br />` +
    `Surface: ${parcelle.attributes.surface} ha`
}
