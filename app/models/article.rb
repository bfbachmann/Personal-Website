class Article < ActiveRecord::Base
	has_many :comments, dependent: :destroy
	validates :title, presence: true, length: {minimum: 2, maximum: 50}
	validates :text, presence: true, length: {minimum: 140}
end
