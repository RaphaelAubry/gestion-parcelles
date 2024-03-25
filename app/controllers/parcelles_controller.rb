class ParcellesController < ApplicationController
  before_action :parcelle, only: [:show, :edit, :update, :destroy]

  def index
    @parcelles = Parcelle.all
  end

  def new
    @parcelle = Parcelle.new
  end

  def create
    @parcelle = Parcelle.create(parcelle_params)
    redirect_to parcelles_path
  end

  def show
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
