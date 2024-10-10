class InvitationPolicy < ApplicationPolicy
  def index?
    record.all? { |guest| user.guests.include?(guest) } ||
    record.all? { |owner| user.owners.include?(owner) }
  end

  def new?
    true
  end

  def create?
    true
  end

  def destroy?
    if record.is_a? User
      return user.guests.include?(record) || user.owners.include?(record)
    end
    if record.is_a? Invitation
      user.guests.include?(record.guest) || user.owners.include?(record.owner)
    end
  end
end
