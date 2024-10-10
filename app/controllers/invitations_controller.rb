class InvitationsController < ApplicationController
  before_action :user

  def index
    @people = if params[:sort].present?
                @user.send(params[:users]).where(id: params[:sort][:ids]).sort_with_params(params)
              elsif params[:filter].present?
                @user.send(params[:users]).filter_with_params(params)
              else
                @user.send(params[:users])
              end
    authorize! @people, with: InvitationPolicy
    @link = Invitation::CONFIG[:link][params[:users].to_sym]
  end

  def new
    authorize! @invitation = Invitation.new
  end

  def create
    @invitation = Invitation.new
    @guest = User.find_by(email: params[:invitation][:guest_email])

    if @guest
      authorize! @invitation = Invitation.create(owner: @user, guest: @guest)

      if @invitation.save
        InvitationMailer.with(user: @user, guest: @invitation.guest).notify_create_guest.deliver_now

        respond_to do |format|
          format.html { redirect_to invitations_path(users: :guests), notice: "Invité(e) enregistré(e)" }
        end
      else
        render :new, status: :unprocessable_entity
      end
    else
      @invitation.errors.add :guest, :not_found, message: 'adresse email introuvable, votre invité doit s\'inscrire'
      InvitationMailer.with(user: @user, mail: params[:invitation][:guest_email]).invite.deliver_now
      render :new, status: :unprocessable_entity
    end
  end


  def destroy
    @invitation = Invitation.find_by(owner: @user, guest_id: params[:id]) ||
                  Invitation.find_by(owner_id: params[:id], guest: @user)

    authorize! @invitation, with: InvitationPolicy

    @invitation.destroy
    if @user == @invitation.owner
      InvitationMailer.with(user: @user, guest: @invitation.guest).notify_destroy_guest.deliver_now
    end
    if @user = @invitation.guest
      InvitationMailer.with(user: @invitation.owner, guest: @user).notify_destroy_owner.deliver_now
    end

    respond_to do |format|
      format.html { redirect_to invitations_path(users: :guests), notice: "Invité(e) supprimé(e) avec succès" }
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
