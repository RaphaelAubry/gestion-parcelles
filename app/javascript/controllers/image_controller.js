import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  fullscreen() {
    if (!document.fullscreenElement) {
      this.element.querySelector('img').requestFullscreen();
    } else {
      document.exitFullscreen()
    }
  }
}
