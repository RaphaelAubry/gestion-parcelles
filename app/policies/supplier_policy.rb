class SupplierPolicy < ApplicationPolicy
  def index?
    true
  end

  def table?
    index?
  end

  def new?
  end

  def create?
  end

  def show?
    true
  end

  def edit?
    true
  end

  def update?
    edit?
  end

  def destroy?
    true
  end

  scope_for :relation, :access do |relation, scope_options|
    relation.where(user: [scope_options[:user]])
  end
end
