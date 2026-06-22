module Finances
  class PaymentPolicy < ApplicationPolicy
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

    scope_for :relation, :access do |relation|
      relation.where(user: user)
    end
  end
end