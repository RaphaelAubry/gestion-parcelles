class UsersController < ApplicationController

  def show
    authorize! @user = User.find(params[:id])
    @user = User.find(params[:id])
  end

  def update
    authorize! @user = User.find(params[:id])
    if @user.update(user_params)
      respond_to do |format|
        format.html
        format.json { render json: @user.table_preferences, status: :ok }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).transform_values! { |value| ActiveRecord::Type::Boolean.new.cast(value) }
                         .permit(User.table_preferences_attributes)
  end
end
