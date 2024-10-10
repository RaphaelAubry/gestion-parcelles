class Invitation < ApplicationRecord
  belongs_to :owner, foreign_key: 'owner_id', class_name: 'User'
  belongs_to :guest, foreign_key: 'guest_id' , class_name: 'User'

  validates :guest, uniqueness: { scope: :owner, message: 'déjà convié' }
  validate :dont_invite_yourself

  CONFIG = { link: { guests: false, owners: true } }

  def dont_invite_yourself
    if guest.email == owner.email
      errors.add(:mail, 'vous avez saisi votre propre adresse email, choisissze l\'adresse de votre invité')
    end
  end
end
