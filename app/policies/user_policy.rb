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
end
