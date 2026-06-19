class TagsController < ApplicationController
  before_action :user
  before_action :tag, only: [ :edit, :update, :destroy ]

  def index
    authorize! @user = current_user, to: :edit?, with: UserPolicy
    @tags = authorized_scope(Tag, type: :relation, as: :access)
    
    respond_to do |format|
      format.html
      format.json { render json: @tags }
    end
  end

  def table
    if params[:order]
      order = params[:order]["0"][:name].present? ? params[:order]["0"][:name] + " " + params[:order]["0"][:dir].upcase : ""
    end

    @tags = authorized_scope(Tag, type: :relation, as: :access)

    @tags = @tags.tap { |x| @total_count = x.count }
                 .where("name ILIKE ?", "%#{params[:search][:value]}%")
                 .or(@tags.where("description ILIKE ?", "%#{params[:search][:value]}%"))
                 .or(@tags.where("color LIKE ?", "%#{params[:search][:value]}%"))
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
          data: @tags.map do |t|
                  [ t.name,
                    t.description,
                    "<td-tag>
                      <tag-box data-controller='tag' data-tag-target='box' data-color='#{t.color}'>
                      </tag-box>
                    </td-tag>
                    ",
                    "<a href='/tags/#{t.id}/edit'>modifier</a>
                     <a href='/tags/#{t.id}' data-turbo-method='delete'>supprimer</a>
                    "
                  ]
                end
          }
      end
    end
  end

  def new
    @tag = Tag.new
    authorize! @tag
  end

  def create
    @tag = Tag.new(tag_params)
    @tag.user = @user
    authorize! @tag

    if @tag.save
      respond_to do |format|
        format.html { redirect_to tags_path, notice: "Le marqueur est créé avec succès" }
      end
    else
      render 'new', status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    @tag.update(tag_params)

    if @tag.save
      respond_to do |format|
        format.html { redirect_to tags_path, notice: "Le marqueur est modifié avec succès" }
      end
    else
      render edit:, status: :unprocessable_entity
    end
  end

  def destroy
    @tag.destroy

    respond_to do |format|
      format.html { redirect_to tags_path, notice: "Marqueur supprimé avec succès" }
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:name, :description, :color, :user_id)
  end

  def tag
    @tag = Tag.find(params[:id])
    authorize! @tag
  end

  def user
    @user = current_user
  end

end
