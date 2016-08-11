class Photo < ActiveRecord::Base
	has_attached_file :image
	belongs_to :article

	validates :title, presence: true
	validates :image,
	    attachment_content_type: { content_type: /\Aimage\/.*\Z/ },
	    attachment_size: { less_than: 5.megabytes }

end
