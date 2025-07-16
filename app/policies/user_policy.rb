class UserPolicy < ApplicationPolicy
  def show?
    allow! if user.owners.include?(record)
  end

  def edit?
    allow! if user == record
  end

  def update?
    edit?
  end

  scope_for :relation, :owners do |relation, scope_options|
    relation.joins("INNER JOIN invitations ON invitations.owner_id = users.id")
            .where('invitations.guest_id = ?', scope_options[:user].id)
  end

  scope_for :relation, :guests do |relation, scope_options|
    relation.joins("INNER JOIN invitations ON invitations.guest_id = users.id")
            .where('invitations.owner_id = ?', scope_options[:user].id)
  end
end
