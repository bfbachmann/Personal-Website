class Photo < ActiveRecord::Base
	has_attached_file :image

	validates :title, presence: true
	validates_attachment :image, presence: true, content_type: { content_type: ["image/jpeg", "image/gif", "image/png"] }
end
