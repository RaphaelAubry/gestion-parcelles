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
    authorized_scope(Parcelle, type: :relation, as: :access, scope_options: { user: user }).include?(record)
  end

  def destroy?
    edit?
  end

  scope_for :relation, :access do |relation, scope_options|
    relation
      .joins(:user_parcelles)
      .where(user_parcelles: { user: [scope_options[:user]] })
  end
end
