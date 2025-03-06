require "test_helper"

class UserTest < ActiveSupport::TestCase

  test "users should not share same emails" do
    users(:one).email = users(:two).email
    assert_not users(:one).save
  end
end
