// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "modules/elements/li_dropdown"
import "modules/elements/fa_xmark"
import "trix"
import "@rails/actiontext"
import * as ActiveStorage from "@rails/activestorage"
ActiveStorage.start()
