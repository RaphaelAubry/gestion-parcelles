class ParcellesController < ApplicationController
  before_action :parcelle, only: [:show, :edit, :update, :destroy]

  def index
    authorize! @parcelles = if params[:sort].present?
                              authorized_scope(Parcelle, type: :relation, as: :access)
                              .where(id: params[:sort][:ids])
                              .sort_with_params(params)
                            elsif params[:filter].present?
                              authorized_scope(Parcelle, type: :relation, as: :access)
                              .filter_with_params(params)
                            else
                              authorized_scope(Parcelle, type: :relation, as: :access)
                            end
    authorize! @user = current_user, to: :edit?, with: UserPolicy
  end

  def carte
    require './lib/modules/r_geo.rb'
    authorize! @parcelles = authorized_scope(Parcelle, type: :relation, as: :access)
    @multipolygon = Parcelle::Factory.multi_polygon(@parcelles.pluck(:polygon).compact)
    @geometry_type = 'MultiPolygon'
  end

  def new
    authorize! @parcelle = Parcelle.new
  end

  def create
    authorize! @parcelle = Parcelle.create(parcelle_params)

    if @parcelle.save
      current_user.parcelles << @parcelle

      respond_to do |format|
        format.html { redirect_to parcelles_path, notice: "La parcelle est enregistrée avec succès" }
      end
    else
      render :new, status: :unprocessable_entity
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
      respond_to do |format|
        format.html { redirect_to parcelles_path, notice: "La parcelle est modifiée avec succès" }
      end
    else
      render edit:, status: :unprocessable_entity
    end
  end

  def destroy
    @parcelle.destroy

    respond_to do |format|
      format.html { redirect_to parcelles_path, notice: "Parcelle supprimée avec succès" }
    end
  end

  private

  def parcelle_params
    params.require(:parcelle).permit(Parcelle::INSTANCE_VARIABLES)
  end

  def parcelle
    authorize! @parcelle = Parcelle.find(params[:id])
  end
end
