class FaXmark extends HTMLElement {
  constructor() {
    super()
    this.onclick = function () {
      this.parentNode.remove()
    }
    this.onmouseover = function () {
      this.style.cursor = 'pointer'
    }
    this.style.marginLeft = '15px'
  }
}

customElements.define("fa-xmark", FaXmark)
