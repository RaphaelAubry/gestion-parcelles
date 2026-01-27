class GeoJSON {
  constructor(feature) {
    this.type = feature.type
    this.id = feature.id
    this.geometry = feature.geometry
    this.properties = feature.properties
    this.geometry_name = feature.geometry_name
  }
}

export { GeoJSON }
