class SupplierPolicy < ApplicationPolicy
  def index?
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
end
