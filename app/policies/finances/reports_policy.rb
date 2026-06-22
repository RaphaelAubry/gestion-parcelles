module Finances
  class ReportsPolicy < ApplicationPolicy
    def index?
      true
    end

    def invoice?
      index?
    end
  end
end