class GuestsController < ApplicationController
  before_action :authenticate_user!
  before_action :user

  def index
    @guests = if params[:sort].present?
                @user.guests.where(id: params[:sort][:ids]).sort_with_params(params)
              elsif params[:filter].present?
                @user.guests.filter_with_params(params)
              else
                @user.guests
              end
    authorize! @guests, with: GuestPolicy
  end

  def edit_guests
    authorize! @guest, with: GuestPolicy
  end

  def update_guests
    guest = User.find_by(email: params[:user][:guest_email])
    authorize! guest, with: GuestPolicy

    if guest
      @user.guests << guest
      guest.owners << @user

      if @user.save && guest.save
        GuestMailer.with(user: @user, guest: guest).notify_create_guest.deliver_now

        respond_to do |format|
          format.html { redirect_to guests_path, notice: "Invité(e) enregistré(e)" }
        end
      else
        @user.errors.add :guests, :not_found, message: 'adresse email introuvable, votre invité doit s\'inscrire'
        render :edit_guests, status: :unprocessable_entity
      end
    else
      @user.errors.add :guests, :not_found, message: 'adresse email introuvable, votre invité doit s\'inscrire'
      render :edit_guests, status: :unprocessable_entity
    end
  end

  def edit
    @guest = User.find(params[:id])
    authorize! @guest, with: GuestPolicy
  end

  def destroy
    @guest = User.find(params[:guest_id])
    authorize! @guest, with: GuestPolicy

    GuestMailer.with(user: @user, guest: @guest).notify_destroy_guest.deliver_now
    @guest.owners.delete(@user.id)
    @user.guests.delete(@guest.id)

    respond_to do |format|
      format.html { redirect_to guests_path, notice: "Invité(e) supprimé(e) avec succès" }
    end
  end

  private

  def guest_params
    params.require(:user).permit(:guest_id, :owner_id)
  end

  def user
    @user = current_user
  end
end
