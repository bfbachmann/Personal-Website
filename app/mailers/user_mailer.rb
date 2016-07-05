class UserMailer < ApplicationMailer

  def admin_contact_email(user)
  	@user = user
  	mail(to: User.where(admin: true).email, subject: 'Blog user contacted you')
  end

end
