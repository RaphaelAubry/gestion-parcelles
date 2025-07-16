import { Controller } from "@hotwired/stimulus"
import DataTable from "datatables.net"
import { config } from "datatable_config"

export default class extends Controller {


  initialize() {
    if (!window.table) {
      this.create()
    }

    // manage table when clicking on back or forward browser button
    window.addEventListener('turbo:load', event => {
      if (window.table) {
        window.table.destroy()
        this.create()
        this.update()
      }
    })
  }

  create() {
    let id = `#${this.scope.element.id}`
    let url = `/${this.scope.element.id}/table`
    let table = new DataTable(id, {
      serverSide: true,
      processing: true,
      paging: true,
      ordering: true,
      info: true,
      columns: config[this.scope.element.id],
      ajax: {
        url: url,
        type: 'POST',
        headers: {
          "X-CSRF-Token": document.querySelector('[name="csrf-token"]').attributes.content.value
        },
        data: {
          invitation_users: new URLSearchParams(window.location.search).get("users")
        }
      }
    })

    window.table = table
    this.#setColumnsVisibility()
  }

  update() {
    window.table.on('draw', event => {
      let element = document.querySelector('[data-total="surface"]')

      if (element) {
        element.textContent = event.dt.ajax.json().total_surface
      }
    })
  }

  #setColumnsVisibility() {
    var checkboxes = document.querySelectorAll('[data-table-target="checkbox"]')

    for (let element of checkboxes) {
      var column_name = element.dataset.columnName
      var value = element.checked

      window.table.column(`${column_name}:name`).visible(value)

      element.addEventListener('change', event => {
        column_name = event.target.dataset.columnName
        value = event.target.checked

        window.table.column(`${column_name}:name`).visible(value)
      })
    }
  }
}
