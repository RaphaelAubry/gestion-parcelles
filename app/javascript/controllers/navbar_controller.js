import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['link', 'menu']
  static values = { path: String }

  pathValueChanged() {
    this.linkTargets.forEach((target) => {
      const path = window.location.pathname
      const search = window.location.search
      if (target.attributes.href.nodeValue == path + search ) {
        target.classList.add('shine')
      } else {
        target.classList.remove('shine')
      }
    })
  }

  displayMenu() {
    switch (this.menuTarget.style.display) {
      case '':
        this.menuTarget.style.display = 'none'
      break
      case 'flex':
        this.menuTarget.style.display = 'none'
      break
      default:
        this.menuTarget.style.display = 'flex'
    }
  }
}
