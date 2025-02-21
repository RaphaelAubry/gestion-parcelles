# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "@hotwired--stimulus.js" # @3.2.2
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin "mapbox-gl" # @3.1.2
pin "process" # @2.0.1
pin_all_from "app/javascript/controllers", under: "controllers"
pin "stimulus-use" # @0.52.2
pin_all_from "app/javascript/modules/mapbox/controls", under: "modules/mapbox/controls"
pin_all_from "app/javascript/modules/requests", under: "modules/requests"
pin "modules/merge"
pin_all_from "app/javascript/modules/mapbox/functions", under: "modules/mapbox/functions"
pin_all_from "app/javascript/modules/mapbox/geojsons", under: "modules/mapbox/geojsons"
pin "modules/sequence"
pin_all_from "app/javascript/modules/strings", under: "modules/strings"
pin_all_from "app/javascript/modules/arrays", under: "modules/arrays"
pin "mapbox_geocoder", to: "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.3/mapbox-gl-geocoder.min.js"
pin "turf", to: "https://cdn.jsdelivr.net/npm/@turf/turf@7.0.0/turf.min.js"
pin "mapbox_draw", to: "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.5.0/mapbox-gl-draw.js"
pin_all_from "app/javascript/modules/elements", under: "modules/elements"
pin "trix"
pin "@rails/actiontext", to: "actiontext.js"
pin "@rails/activestorage", to: "activestorage.esm.js"
pin "modules/wait"
