class Message < ActiveRecord::Base
  belongs_to :user
  validates :user_email, presence: true
  validates :subject, presence: true, length: { minimum: 5 }
  validates :body, presence: true, length: { minimum: 10 }
end
