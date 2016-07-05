class ContactAdminMessage < ActiveRecord::Base
	validates :email, length: { minimum: 5 }
	validates :subject, presence: true, length: { minimum: 2 }
	validates :message, presence: true, length: { minimum: 8 }
end
