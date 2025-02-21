class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :parcelle
  has_rich_text :content
  has_many_attached :images, dependent: :destroy
end
