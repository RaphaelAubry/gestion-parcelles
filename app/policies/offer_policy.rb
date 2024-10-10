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

end
