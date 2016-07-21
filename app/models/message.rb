class Message < ActiveRecord::Base
  belongs_to :user
  validates :user_email, presence: true
  validates :subject, presence: true, length: { minimum: 2 }
  validates :body, presence: true, length: { minimum: 10 }
end
