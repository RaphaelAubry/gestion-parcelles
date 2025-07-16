class TagPolicy < ApplicationPolicy
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
    true
  end

  def edit?
    record.user == user
  end

  def update?
    edit?
  end

  def destroy?
    edit?
  end

  scope_for :relation, :access do |relation, scope_options|
    relation.where(user: [scope_options[:user]])
  end
end
