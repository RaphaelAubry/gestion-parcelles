class ParcellePolicy < ApplicationPolicy
  authorize :target_user, optional: true
  
  def new?
    true
  end

  def create?
    new?
  end

  def index?
    user == target_user || user.owners.include?(target_user)
  end

  def table?
    index?
  end

  def carte?
    index?
  end

  def edit?
    # the current_user owns the record
    record.users.include?(user)
  end

  def update?
    edit?
  end

  def show?
    record.users.include?(user) || record.users.any? { |u| user.owners.include?(u) }
  end

  def destroy?
    edit?
  end

  scope_for :relation, :access do |relation, scope_options|
    if (scope_options[:current_user].owners.include? scope_options[:target_user]) ||
       (scope_options[:current_user] == scope_options[:target_user])

      relation.joins(:user_parcelles)
              .where(user_parcelles: { user: scope_options[:target_user] })
    else
      relation.none
      
    end
  end

  scope_for :relation, :available_for_contract do |relation, scope_options|
      relation.where(contract: nil)
              .joins(:user_parcelles)
              .where(user_parcelles: { user: scope_options[:user] })
              
  end
end
