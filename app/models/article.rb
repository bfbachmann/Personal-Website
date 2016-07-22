class Article < ActiveRecord::Base
	has_many :comments, dependent: :destroy
	has_one :photo
	
	validates :title, presence: true, length: {minimum: 2, maximum: 50}
	validates :text, presence: true, length: {minimum: 140}
end
