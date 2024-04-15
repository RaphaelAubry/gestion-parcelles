class UserParcelle < ApplicationRecord
  belongs_to :user
  belongs_to :parcelle
end
