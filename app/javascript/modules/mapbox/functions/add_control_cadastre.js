import mapboxgl from "mapbox-gl"
import { CadastreControl } from "modules/mapbox/controls"

mapboxgl.Map.prototype.addControlCadastre = function (location = 'top-right') {
  this.addControl(new CadastreControl(), location)
}
