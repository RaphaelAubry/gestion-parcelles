class OfferPolicy < ApplicationPolicy
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
    relation.where(supplier: { user: [scope_options[:user]]})
  end
end
