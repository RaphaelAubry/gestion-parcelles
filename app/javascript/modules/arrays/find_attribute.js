import "modules/strings/context_attribute"

Array.prototype.findAttribute = function(value = '') {
  return this.find(element => element.id.contextAttribute() == value)
}
