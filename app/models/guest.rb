class Guest < User
  def self.policy_name
    "GuestPolicy"
  end
end
