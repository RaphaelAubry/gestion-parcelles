class MapsController < ApplicationController
    skip_before_action :authenticate_user!

    def token
        respond_to do |format|
          format.json { render json: { token: ENV['MAPBOX_TOKEN'] } }
        end
    end
end
