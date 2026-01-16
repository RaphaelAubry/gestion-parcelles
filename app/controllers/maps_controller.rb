class MapsController < ApplicationController
    def token
        respond_to do |format|
          format.json { render json: { token: ENV['MAPBOX_TOKEN'] } }
        end
    end
end
