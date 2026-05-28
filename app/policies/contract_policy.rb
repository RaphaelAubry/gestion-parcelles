class ContractPolicy < ApplicationPolicy
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

  def edit?
    record.user_id == user.id
  end

  def update?
    edit?
  end

  def show?
    record.user_id == user.id
  end

  def destroy?
    edit?
  end

  def destroy_associated_parcelle?
    edit?
  end

  relation_scope do |scope|
    scope.where(user: user)
  end
end