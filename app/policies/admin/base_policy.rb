module Admin
  class BasePolicy < ApplicationPolicy
    private

    def admin?
      user&.admin?
    end
  end
end