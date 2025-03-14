class CommentsController < ApplicationController
  before_action :authenticate_user!
  before_action :parcelle, only: [:new, :create]
  before_action :comment, only: [:edit, :update, :destroy]

  def new
    @comment = Comment.new
  end

  def create
    @user = current_user
    @comment = Comment.create(comment_params)
    @comment.user = @user
    @parcelle.comments << @comment

    if @comment.save
      respond_to do |format|
        format.html { redirect_to parcelle_path(@parcelle) }
      end
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @parcelle = @comment.parcelle
  end

  def update
    if @comment.update(comment_params)
      @parcelle = @comment.parcelle

      respond_to do |format|
        format.html { redirect_to parcelle_path(@parcelle) }
      end
    else
      render :edit, status: :unprocessable_entity
    end

  end

  def destroy
    @parcelle = @comment.parcelle

    keys = [params[:cloudinary_key]] if params[:cloudinary_key]
    keys = @comment.images.map(&:key) if @comment.images.present? && !params[:attachment_id]
    Cloudinary::Api.delete_resources(keys) if keys.present?

    params[:attachment_id] ? @comment.images.find(params[:attachment_id]).purge : @comment.destroy

    respond_to do |format|
      format.html { redirect_to parcelle_path(@parcelle) }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, images: [])
  end

  def parcelle
    @parcelle = Parcelle.find(params[:parcelle_id])
  end

  def comment
    @comment = Comment.find(params[:id])
    authorize! @comment
  end
end
