class LiDropdown extends HTMLElement {
  constructor() {
    super()
    this.ul = this.querySelector('ul')

    this.onclick = function() {
      switch (this.ul.style.display) {
      case "":
        this.ul.style.display = "block"
        break
      case "none":
        this.ul.style.display = "block"
        break
      case "block":
        this.ul.style.display = "none"
        break
      }
    }
  }
}

customElements.define("li-dropdown", LiDropdown)
