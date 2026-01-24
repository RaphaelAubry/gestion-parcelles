import { Controller } from "@hotwired/stimulus"
import $ from 'jquery'
import DataTable from "datatables.net"
import { config, headers } from "modules/datatable"
import "modules/datatable/functions"

export default class extends Controller {
  static values = { name: String }

  connect() {
    // gestion du connect
    if (this.element.dataset.dtInitialized) return
    this.element.dataset.dtInitialized = "true"

    if ($.fn.DataTable.isDataTable(this.element)) return
  
    this.#createTable()
    this.#setColumnsVisibility()

    // gestion des headers pour la table responsive
    this.table.setColumnNames(headers)

    const setColumnNamesListener = () => { this.table.setColumnNames(headers) }
    window.addEventListener('resize',  setColumnNamesListener)
  }

  disconnect() {
    if (!this.table) return
  }

  #createTable() {
    const name = this.nameValue

    if (!name || !config[name]) {
      console.warn(`[datatable] config manquante pour ${name}`)
      return
    }

    const columns = config[name]
    const url = `/${name}/table`

    this.table = new DataTable(this.element, {
      serverSide: true,
      processing: true,
      paging: true,
      ordering: true,
      info: true,
      columns: columns,
       fixedColumns: {
        leftColumns: 1
      },
      fixedHeader: true,
      scrollX: true,
      scrollY: '60vh',
      ajax: {
        url: url,
        type: 'POST',
        headers: {
          "X-CSRF-Token": document.querySelector('[name="csrf-token"]')?.content
        },
        data: {
          invitation_users: new URLSearchParams(window.location.search).get("users")
        }
      }
    })
    
    // gestion des headers pour la table responsive
    this.#addColumnHeaders(columns)
    // la formule total surface
    this.#updateFooter()
  }
  
  // ajout des dataset name pour récupérer les noms de colonnes en vue smartphone
  #addColumnHeaders(columns) {
    this.table.on('draw', event => {
      this.table.rows().every(function() {
        this.node().childNodes.forEach(td => {
          const colName = columns[td._DT_CellIndex.column].name
          td.dataset.name = colName
        })
      })
    })
  }

  #updateFooter() {
    this.table.on('draw', event => {
      let elements = document.querySelectorAll('[data-total="surface"]')
  
      elements.forEach(e => {
        e.textContent = event.dt.ajax.json().total_surface
      })
    })
  }

  #setColumnsVisibility() {
    var checkboxes = document.querySelectorAll('[data-datatable-target="checkbox"]')

    for (let element of checkboxes) {
      var column_name = element.dataset.columnName
      var value = element.checked

      this.table.column(`${column_name}:name`).visible(value)

      element.addEventListener('change', event => {
        column_name = event.target.dataset.columnName
        value = event.target.checked

        this.table.column(`${column_name}:name`).visible(value)
      })
    }
  }
}
