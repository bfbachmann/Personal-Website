class Photo < ActiveRecord::Base
	belongs_to :article
	validates :title, presence: true
	validates :image_url, presence: true, length: { minimum: 5 }
end
