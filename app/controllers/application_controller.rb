class ApplicationController < ActionController::Base
  before_action :set_locale
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :surname])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :surname])
  end

  private

  def set_locale
    I18n.locale = I18n.default_locale
  end
end
