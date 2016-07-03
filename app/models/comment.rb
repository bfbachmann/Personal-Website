class Comment < ActiveRecord::Base
  belongs_to :article
  validates :commenter, presence: true
  validates :body, presence: true, length: {minimum: 1, maximum: 140}
end
