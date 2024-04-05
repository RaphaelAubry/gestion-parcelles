import { Controller } from '@hotwired/stimulus'
import { useWindowResize } from 'stimulus-use'

export default class extends Controller {
  static targets = ['width', 'menu']

  connect() {
    useWindowResize(this)
  }

  windowResize({width, height, event }) {
  }
}
