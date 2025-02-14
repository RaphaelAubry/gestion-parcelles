class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :parcelle
  has_rich_text :content
end
