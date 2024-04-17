class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    authorize! @user = User.find(params[:id])
  end

  def update
    authorize! @user = User.find(params[:id])
    @user.update(user_params)
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).transform_values! { |value| ActiveRecord::Type::Boolean.new.cast(value) }
                         .permit(User.table_preferences_attributes)
  end
end
