class GuestMailer < ApplicationMailer
  def notify_create_guest
    @user = params[:user]
    guest = params[:guest]
    mail(
      to: guest.email,
      subject: 'Invitation'
    )
  end

  def notify_destroy_guest
    @user = params[:user]
    guest = params[:guest]
    mail(
      to: guest.email,
      subject: 'Invitation révoquée'
    )
  end

  def invite
    @user = params[:user]
    mail = params[:mail]
    mail(
      to: mail,
      subject: 'Invitation'
    )
  end
end
