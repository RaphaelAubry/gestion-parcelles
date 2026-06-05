class InvoicePolicy < ApplicationPolicy
  def index?
    true
  end

  def table?
    index?
  end
  
  def new?
    true
  end

  def create?
    new?
  end

  def edit?
    record.user_id == user.id
  end

  def update?
    edit?
  end

  def destroy?
    edit?
  end

  relation_scope do |scope|
    scope.where(user: user)
  end
end