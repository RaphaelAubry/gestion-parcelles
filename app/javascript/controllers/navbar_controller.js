import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['link']
  static values = { path: String }

  pathValueChanged() {
    this.linkTargets.forEach((target) => {
      if (target.attributes.href.nodeValue == window.location.pathname) {
        target.classList.add('shine')
      } else {
        target.classList.remove('shine')
      }
    })
  }
}
