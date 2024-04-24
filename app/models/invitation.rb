class Invitation < ApplicationRecord
  belongs_to :owner, foreign_key: 'owner_id', class_name: 'User'
  belongs_to :guest, foreign_key: 'guest_id' , class_name: 'User'

  validates :guest, uniqueness: { scope: :owner, message: 'déjà convié' }
end
