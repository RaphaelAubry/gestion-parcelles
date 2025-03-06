require "test_helper"

class CommentPolicyTest < ActionDispatch::IntegrationTest
  test "edit is not authorized if comment does not belong to user" do
    comment = comments(:one)
    user = users(:two)
    policy = CommentPolicy.new(comment, user: user)
    assert_not policy.edit?
  end

  test "update is not authorized if comment does not belong to user" do
    comment = comments(:one)
    user = users(:two)
    policy = CommentPolicy.new(comment, user: user)
    assert_not policy.update?
  end

  test "destroy is not authorized if comment does not belong to user" do
    comment = comments(:one)
    user = users(:two)
    policy = CommentPolicy.new(comment, user: user)
    assert_not policy.destroy?
  end

  test "edit is authorized if comment belongs to user" do
    comment = comments(:one)
    user = users(:one)
    policy = CommentPolicy.new(comment, user: user)
    assert policy.edit?
  end

  test "update is authorized if comment belongs to user" do
    comment = comments(:one)
    user = users(:one)
    policy = CommentPolicy.new(comment, user: user)
    assert policy.update?
  end

  test "destroy is authorized if comment belongs to user" do
    comment = comments(:one)
    user = users(:one)
    policy = CommentPolicy.new(comment, user: user)
    assert policy.destroy?
  end
end
