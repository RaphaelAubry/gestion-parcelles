class ParcellePolicy < ApplicationPolicy
  def new?
    true
  end

  def create?
    new?
  end

  def index?
    true
  end

  def table?
    index?
  end

  def carte?
    index?
  end

  def edit?
    # the current_user owns the record
    record.users.include?(user)
  end

  def update?
    edit?
  end

  def show?
    record.users.include?(user) || record.users.any? { |u| user.owners.include?(u) }
  end

  def destroy?
    edit?
  end

  scope_for :relation, :access do |relation, scope_options|
    relation.joins(:user_parcelles)
            .where(user_parcelles: { user: [scope_options[:user]] })
  end
end
