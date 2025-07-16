class ParcellesController < ApplicationController
  include Filenaming

  before_action :parcelle, only: [:show, :edit, :update, :destroy]

  def index
    authorize! @parcelles = authorized_scope(Parcelle, type: :relation, as: :access, scope_options: { user: current_user })
    authorize! @user = current_user, to: :edit?, with: UserPolicy

    respond_to do |format|
      format.html
      format.json { render json: @parcelles }
      format.xlsx { response.headers['Content-Disposition'] = "attachment; filename=parcelles_#{Filenaming.now}" }
    end
  end

  def table
    if params[:order]
      order = params[:order]["0"][:name].present? ? params[:order]["0"][:name] + " " + params[:order]["0"][:dir].upcase : ""
    end

    authorize! @parcelles = authorized_scope(Parcelle.left_outer_joins(:tag), type: :relation, as: :access, scope_options: { user: current_user })

    @parcelles = @parcelles.tap { |x| @total_count = x.count }
                           .where("parcelles.reference_cadastrale LIKE ?", "%#{params[:search][:value]}%")
                           .or(@parcelles.where("parcelles.lieu_dit LIKE ?", "%#{params[:search][:value]}%"))
                           .or(@parcelles.where("parcelles.code_officiel_geographique LIKE ?", "%#{params[:search][:value]}%"))
                           .or(@parcelles.where("parcelles.surface::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                           .or(@parcelles.where("parcelles.annee_plantation::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                           .or(@parcelles.where("parcelles.distance_rang::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                           .or(@parcelles.where("parcelles.distance_pieds::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                           .or(@parcelles.where("tags.name LIKE ?", "%#{params[:search][:value]}%"))
                           .order(order)
                           .tap { |x| @filtered_count = x.count }
                           .limit(params[:length])
                           .offset(params[:start])

    respond_to do |format|
      format.json do
        render json: {
          draw: params[:draw],
          recordsTotal: @total_count,
          recordsFiltered: @filtered_count,
          data: @parcelles.map do |p|
                  [ "<a href='#{parcelle_path(p)}'>#{p.reference_cadastrale}</a>",
                    p.lieu_dit,
                    p.code_officiel_geographique,
                    p.surface,
                    p.annee_plantation,
                    p.distance_rang,
                    p.distance_pieds,
                    "<td-tag>
                      <td-tag-name>
                        #{p&.tag&.name}
                      </td-tag-name>
                        <tag-box data-controller='tag' data-tag-target='box' data-color='#{p&.tag&.color}'>
                        </tag-box>
                    </td-tag>
                    ",
                    "<a href='/parcelles/#{p.id}/edit'>modifier</a>
                     <a href='/parcelles/#{p.id}' data-turbo-method='delete'>supprimer</a>
                    "
                  ]
                end
          }
      end
    end
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
    @parcelle = params.include?(:parcelle) ? Parcelle.new(parcelle_params) : Parcelle.new
    authorize! @parcelle
  end

  def create
    authorize! @parcelle = Parcelle.create(parcelle_params)

    if @parcelle.save
      @parcelle.update_polygon(params[:parcelle][:polygon])
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
    @parcelle_mapbox_info = @parcelle.to_mapbox
    @geometry_type = 'Polygon'
    @comment = Comment.new
  end

  def edit
  end

  def update
    if @parcelle.update(parcelle_params)
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
