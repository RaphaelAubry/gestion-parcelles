import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['link', 'menu']
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

  displayMenu() {
    if (this.menuTarget.style.display === "flex" ||
        this.menuTarget.style.display === "" ) {
      this.menuTarget.style.display = "none";
    } else {
      this.menuTarget.style.display = "flex";
    }
  }
}
