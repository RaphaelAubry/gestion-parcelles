class ParcellesController < ApplicationController
  before_action :parcelle, only: [:show, :edit, :update, :destroy]

  def index
    authorize! @parcelles = if params[:sort].present?
                              authorized_scope(Parcelle, type: :relation, as: :access, scope_options: { user: current_user })
                              .where(id: params[:sort][:ids])
                              .sort_with_params(params)
                            elsif params[:filter].present?
                              authorized_scope(Parcelle, type: :relation, as: :access,  scope_options: { user: current_user })
                              .filter_with_params(params)
                            else
                              authorized_scope(Parcelle, type: :relation, as: :access,  scope_options: { user: current_user })
                            end
    authorize! @user = current_user, to: :edit?, with: UserPolicy
  end

  def carte
    require './lib/modules/r_geo.rb'
    user = params[:user_id] ? User.find(params[:user_id]) : current_user
    authorize! selection = authorized_scope(Parcelle, type: :relation, as: :access, scope_options: { user: user }).where.not(polygon: nil)
    @centroid = Parcelle::Factory.multi_polygon(selection.pluck(:polygon).compact).centroid
    @geometry_type = 'Polygon'
    @parcelles = selection.to_mapbox
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
    @centroid = @parcelle.polygon.centroid.coordinates if @parcelle.polygon
    @parcelle = @parcelle.to_mapbox
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
      render 'edit'
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
