class TagsController < ApplicationController
  before_action :user

  def index
    authorize! @tags = if params[:sort].present?
                          @user.tags.where(id: params[:sort][:ids]).sort_with_params(params)
                       elsif params[:filter].present?
                          @user.tags.filter_with_params(params)
                       else
                          @user.tags
                       end
  end

  def new
    @tag = Tag.new
  end

  def create
    @tag = Tag.create(tag_params)
    @tag.user = @user

    if @tag.save
      respond_to do |format|
        format.html { redirect_to tags_path, notice: "Le marqueur est créé avec succès" }
      end
    else
      render 'new', status: :unprocessable_entity
    end
  end

  def edit
    @tag = Tag.find(params[:id])
  end

  def update
    @tag = Tag.find(params[:id])
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
    @tag = Tag.find(params[:id])
    @tag.destroy

    respond_to do |format|
      format.html { redirect_to tags_path, notice: "Marqueur supprimé avec succès" }
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:name, :description, :color, :user_id)
  end

  def user
    @user = current_user
  end

end
