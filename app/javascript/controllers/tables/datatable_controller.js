import { Controller } from "@hotwired/stimulus"
import $ from 'jquery'
import DataTable from "datatables.net"
import { config } from "modules/datatable"
import { headers } from "../../modules/datatable/datatable_headers"

export default class extends Controller {
  initialize() {
    $.fn.dataTable.Api.register('setColumnNames', function() {
      
      if (window.innerWidth < 768) {

        window.table.rows().every(function(row) {
          this.node().childNodes.forEach((td) => {
              if(!td.querySelector('th')) {
                const name = document.createElement('th')
                name.innerText = headers[td.dataset.name]
                td.prepend(name)
              }
          })
        })
      }

      if (window.innerWidth >= 768) {
        
        window.table.rows().every(function(row) {
          this.node().childNodes.forEach((td) => {
              if(td.querySelector('th')) {
                td.querySelector('th').remove()
              }
          })
        })

      }
    })

    if (!window.table) {
      this.create()
    }

    // manage table when clicking on back or forward browser button
    window.addEventListener('turbo:load', event => {
      if (window.table) {
        window.table.destroy()
        this.element.setAttribute('id', window.location.pathname.split("/")[1])
        this.create()
        this.update_footer()
      }
    })
  }

  create() {
    let id = `#${this.scope.element.id}`

    if ($.fn.DataTable.isDataTable(id)) {
      $(id).Datatable().destroy();
    }

    let url = `/${this.scope.element.id}/table`
    let columns = config[this.scope.element.id]

    window.table = new DataTable(id, {
      serverSide: true,
      processing: true,
      paging: true,
      ordering: true,
      info: true,
       fixedColumns: {
        leftColumns: 1
      },
      fixedHeader: true,
      scrollX: true,
      scrollY: '80vh',
      columns: columns,
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

    this.#setColumnsVisibility()
    this.#addDatasetColumnName(columns)
    this.update_footer()
  }

  update_footer() {
    window.table.on('draw', event => {
      let elements = document.querySelectorAll('[data-total="surface"]')
  
      elements.forEach(e => {
        e.textContent = event.dt.ajax.json().total_surface
      })
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

  #addDatasetColumnName(columns) {
    window.table.on('draw', event => {
      table.rows().every(function() {  
        this.node().childNodes.forEach((td) => {
          td.setAttribute('data-name', columns[td._DT_CellIndex.column].name)
        })
      })
      window.table.setColumnNames()
    })
  }
}
