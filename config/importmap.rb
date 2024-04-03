# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin "mapbox-gl" # @3.1.2
pin "process" # @2.0.1
pin_all_from "app/javascript/controllers", under: "controllers"
