class ParcellesController < ApplicationController
  before_action :parcelle, only: [:show, :edit, :update, :destroy]

  def index
    @parcelle = Parcelle.new
    @parcelles = params[:sort].present? ? Parcelle.sort_with_params(params) : Parcelle.all
  end

  def carte
    require './lib/modules/r_geo.rb'
    @parcelles = Parcelle.all
    @multipolygon = Parcelle::Factory.multi_polygon(@parcelles.pluck(:polygon))
    @geometry_type = 'MultiPolygon'
  end

  def new
    @parcelle = Parcelle.new
  end

  def create
    @parcelle = Parcelle.create(parcelle_params)
    if @parcelle.save
      respond_to do |format|
        format.html { redirect_to parcelles_path, notice: "La parcelle est enregistrée avec succès" }
      end
    else
      render new:, status: :unprocessable_entity
    end
  end

  def show
    @geometry_type = 'Polygon'
  end

  def edit
    render :new
  end

  def update
    @parcelle.update(parcelle_params)

    redirect_to parcelles_path
  end

  def destroy
    @parcelle.destroy

    redirect_to parcelles_path
  end

  private

  def parcelle_params
    params.require(:parcelle).permit(Parcelle::INSTANCE_VARIABLES)
  end

  def parcelle
    @parcelle = Parcelle.find(params[:id])
  end
end
