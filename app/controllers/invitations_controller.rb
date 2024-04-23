class InvitationsController < ApplicationController
  before_action :user

  def index
    @guests = if params[:sort].present?
            @user.guests.where(id: params[:sort][:ids]).sort_with_params(params)
          elsif params[:filter].present?
            @user.guests.filter_with_params(params)
          else
            @user.guests
          end
    authorize! @guests, with: InvitationPolicy
  end

  def new
    @invitation = Invitation.new
  end

  def create
    @invitation = Invitation.new
    @guest = User.find_by(email: params[:invitation][:guest_email])

    if @guest
      @invitation = Invitation.create(owner: @user, guest: @guest)

      if @invitation.save
        GuestMailer.with(user: @user, guest: @invitation.guest).notify_create_guest.deliver_now

        respond_to do |format|
          format.html { redirect_to invitations_path, notice: "Invité(e) enregistré(e)" }
        end
      else
        render :new, status: :unprocessable_entity
      end
    else
      @invitation.errors.add :guest, :not_found, message: 'adresse email introuvable, votre invité doit s\'inscrire'
      GuestMailer.with(user: @user, mail: params[:invitation][:guest_email]).invite.deliver_now
      render :new, status: :unprocessable_entity
    end
  end


  def destroy
    @invitation = Invitation.find_by(guest_id: params[:id])

    @invitation.destroy
    GuestMailer.with(user: @user, guest: @invitation.guest).notify_destroy_guest.deliver_now

    respond_to do |format|
      format.html { redirect_to invitations_path, notice: "Invité(e) supprimé(e) avec succès" }
    end
  end

  private

  def invitation_params
    params.require(:invitation).permit(:guest_id, :owner_id)
  end

  def user
    @user = current_user
  end
end
