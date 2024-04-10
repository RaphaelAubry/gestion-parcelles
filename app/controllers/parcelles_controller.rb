class ParcellesController < ApplicationController
  before_action :authenticate_user!
  before_action :parcelle, only: [:show, :edit, :update, :destroy]


  def index
    @parcelle = Parcelle.new
    @parcelles = if params[:sort].present?
                    Parcelle.where(id: params[:sort][:ids]).sort_with_params(params)
                 elsif params[:filter].present?
                    Parcelle.filter_with_params(params)
                 else
                    Parcelle.all
                 end
  end

  def carte
    require './lib/modules/r_geo.rb'
    @parcelles = Parcelle.all
    @multipolygon = Parcelle::Factory.multi_polygon(@parcelles.pluck(:polygon).compact)
    @geometry_type = 'MultiPolygon'
  end

  def new
    @parcelle = Parcelle.new
  end

  def create
    @parcelle = Parcelle.create(parcelle_params)
    if @parcelle.save
      redirect_to parcelles_path, notice: "La parcelle est enregistrée avec succès"
    else
      render 'new'
    end
  end

  def show
    @geometry_type = 'Polygon'
  end

  def edit
  end

  def update
    @parcelle.update(parcelle_params)

    if @parcelle.save
      redirect_to parcelles_path, notice: "La parcelle est modifiée avec succès"
    else
      render 'edit'
    end
  end

  def destroy
    @parcelle.destroy
    redirect_to parcelles_path, notice: "Parcelle supprimée avec succès"
  end

  private

  def parcelle_params
    params.require(:parcelle).permit(Parcelle::INSTANCE_VARIABLES)
  end

  def parcelle
    @parcelle = Parcelle.find(params[:id])
  end
end
