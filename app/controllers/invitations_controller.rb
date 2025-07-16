class InvitationsController < ApplicationController
  before_action :user

  def index
    @invitations = authorized_scope(User, type: :relation, as: params[:users].to_sym, scope_options: { user: current_user }, with: UserPolicy)

    @link = Invitation::CONFIG[:link][params[:users].to_sym]

    respond_to do |format|
      format.html
      format.json { render json: @invitations }
    end
  end

  def table
    if params[:order]
      order = params[:order]["0"][:name].present? ? params[:order]["0"][:name] + " " + params[:order]["0"][:dir].upcase : ""
    end

    @invitations = authorized_scope(User, type: :relation, as: params[:invitation_users].to_sym, scope_options: { user: current_user }, with: UserPolicy)

    @invitations = @invitations.tap { |x| @total_count = x.count }
                               .where("name LIKE ?", "%#{params[:search][:value]}%")
                               .or(@invitations.where("surname LIKE ?", "%#{params[:search][:value]}%"))
                               .or(@invitations.where("phone::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                               .or(@invitations.where("email LIKE ?", "%#{params[:search][:value]}%"))
                               .or(@invitations.where("invitations.created_at::TEXT LIKE ?", "%#{params[:search][:value]}%"))
                               .order(order)
                               .tap { |x| @filtered_count = x.count }
                               .select('users.name, users.surname, users.phone, users.email, invitations.created_at as created_at, invitations.id as id')
                               .limit(params[:length])
                               .offset(params[:start])

    respond_to do |format|
      format.json do
        render json: {
          draw: params[:draw],
          recordsTotal: @total_count,
          recordsFiltered: @filtered_count,
          data: @invitations.map do |i|
                              [ i.name,
                                i.surname,
                                i.phone,
                                i.email,
                                l(i.created_at, format: :short),
                                "
                                <a href='/invitations/#{i.id}' data-turbo-method='delete'>supprimer</a>
                                "
                              ]
                            end
          }
      end
    end


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
    @invitation = Invitation.find(params[:id])

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
