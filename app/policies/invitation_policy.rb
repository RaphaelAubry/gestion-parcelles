class InvitationPolicy < ApplicationPolicy
  def index?
    true
  end

  def new?
    true
  end

  def create?
    true
  end

  def destroy?
    user.guests.include?(record)
  end
end
