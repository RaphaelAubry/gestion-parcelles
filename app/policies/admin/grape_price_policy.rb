module Admin
  class GrapePricePolicy < BasePolicy
    def index?
      admin?
    end

    def table?
      index?
    end

    def new?
      import?
    end

    def import?
      admin?
    end

    def edit?
      admin?
    end

    def update?
      edit?
    end

    relation_scope do |scope|
      admin? ? scope.all : scope.none
    end
  end
end