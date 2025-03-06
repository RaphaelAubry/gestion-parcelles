require "test_helper"

class ParcelleTest < ActiveSupport::TestCase
  test "should have a valid reference cadastrale" do
    p1 = Parcelle.new
    assert_not p1.save, "saved without reference cadastrale"
  end

  test "should have a valid code officiel geographique" do
    p1 = Parcelle.new
    assert_not p1.save, "saved without code officiel geographique"
  end

  test "should validate reference cadastrale number 0B1234" do
    assert_match Parcelle::REGEX_REFERENCE_CADASTRALE, "0B1234", "regex reference cadastrale does not match 0B1234"
  end

  test "should validate reference cadastrale number B123" do
    assert_match Parcelle::REGEX_REFERENCE_CADASTRALE, "B123", "regex reference cadastrale does not match B123"
  end

  test "should validate reference cadastrale number AB1234" do
    assert_match Parcelle::REGEX_REFERENCE_CADASTRALE, "AB1234", "regex reference cadastrale does not match AB1234"
  end

  test "should not validate reference cadastrale number 12" do
    assert_no_match Parcelle::REGEX_REFERENCE_CADASTRALE, "12", "regex reference cadastrale matches 12"
  end

  test "should validate code officiel geographique 12345" do
    assert_match Parcelle::REGEX_CODE_OFFICIEL_GEOGRAPHIQUE, "12345", "regex code officiel geographique does not match 12345"
  end

  test "should validate code officiel geographique 2B345" do
    assert_match Parcelle::REGEX_CODE_OFFICIEL_GEOGRAPHIQUE, "2B345", "regex code officiel geographique does not match 2B345"
  end

  test "should not validate code officiel geographique A12" do
    assert_no_match Parcelle::REGEX_CODE_OFFICIEL_GEOGRAPHIQUE, "A12", "regex code officiel geographique matches A12"
  end

  test "should not validate code officiel geographique 1" do
    assert_no_match Parcelle::REGEX_CODE_OFFICIEL_GEOGRAPHIQUE, "1", "regex code officiel geographique marches 1"
  end
end
