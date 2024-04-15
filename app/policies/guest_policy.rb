class GuestPolicy < ApplicationPolicy
  def index?
    true
  end

  def edit_guests?
    true
  end

  def update_guests?
    true
  end

  def edit?
    false
  end

  def destroy?
    user.guests.include?(record)
  end
end
