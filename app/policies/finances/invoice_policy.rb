module Finances
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

   scope_for :relation, :invoices_balances do |relation|
    relation
      .left_outer_joins(:payments)
      .where(user: user)
      .select('
        invoices.id,
        invoices.year,
        invoices.number,
        invoices.total_amount,
        invoices.total_amount - SUM(payments.amount) as balance'
      )
      .group('
        invoices.id,
        invoices.year,
        invoices.number,
        invoices.total_amount'
      )
    end
  end
end