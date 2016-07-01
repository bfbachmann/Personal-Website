class Comment < ActiveRecord::Base
  belongs_to :article
  validates :commenter, presence: true, length: {minimum: 5, maximum: 15}
  validates :body, presence: true, length: {maximum: 140}
end
