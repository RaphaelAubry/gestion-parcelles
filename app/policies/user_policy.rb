class UserPolicy < ApplicationPolicy
  def show?
    false
  end
end
