class Article < ActiveRecord::Base
	validates :title, presence: true, length: {minimum: 2, maximum: 50}
	validates :text, presence: true, length: {minimum: 140}
end
