import mapboxgl from "mapbox-gl" 
import { wait } from "modules/wait" 

mapboxgl.Map.prototype.addControlGeolocate = function () {
  const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    },
    showAccuracyCircle: true,
    trackUserLocation: true,
    showUserHeading: true
  }) 

  this.addControl(geolocate) 

  wait('.mapboxgl-ctrl-geolocate > span').then(el => el.title = 'Trouver ma position') 

  let positions = [] 
  let lastFlyToTime = 0 
  const FLY_INTERVAL = 3000  // intervalle minimal entre deux recentrages

  geolocate.on('geolocate', (event) => {
    const { latitude, longitude, accuracy } = event.coords 

    // Ignorer les positions trop imprécises
    if (accuracy > 50) return 

    positions.push({ latitude, longitude, accuracy, timestamp: Date.now() }) 
    if (positions.length > 5) positions.shift() 

    // Moyenne pondérée par précision
    const weighted = positions.reduce((acc, pos) => {
      const weight = 1 / pos.accuracy 
      acc.lat += pos.latitude * weight 
      acc.lng += pos.longitude * weight 
      acc.totalWeight += weight 
      return acc 
    }, { lat: 0, lng: 0, totalWeight: 0 }) 

    const avgLat = weighted.lat / weighted.totalWeight 
    const avgLng = weighted.lng / weighted.totalWeight 

    const now = Date.now() 
    if (now - lastFlyToTime > FLY_INTERVAL) {
      // Recentre la carte sur la position moyenne
      this.flyTo({
        center: [avgLng, avgLat],
        zoom: 15,
        speed: 1.2
      }) 
      lastFlyToTime = now 
    }
  }) 

  return geolocate 
} 
