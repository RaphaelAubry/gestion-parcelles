class UserPolicy < ApplicationPolicy
  def show?
    false
  end

  def edit?
    allow! if user == record
  end

  def update?
    edit?
  end
end
