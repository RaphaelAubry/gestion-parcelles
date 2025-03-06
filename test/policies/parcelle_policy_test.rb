require "test_helper"

class ParcellePolicyTest < ActionDispatch::IntegrationTest

  parcelles = Parcelle.all
  p1 = parcelles[0]
  users = User.all
  u1 = users[0]
  u2 = users[1]
  u3 = users[2]
  u1.parcelles << p1
  p1.users << u1

  test "parcelle show if parcelle belongs to user" do
    policy1 = ParcellePolicy.new(p1, user: u1)
    assert policy1.show?
  end

  test "parcelle show if user is invited by parcelle user" do
    Invitation.create(owner: u1, guest: u2)
    policy2 = ParcellePolicy.new(p1, user: u2)
    assert policy2.show?
  end

  test "parcelle not show if user is not invited" do
    policy3 = ParcellePolicy.new(p1, user: u3)
    assert_not policy3.show?
  end
end
