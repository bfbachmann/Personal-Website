class UserMailer < ApplicationMailer

  def send_email_to_admin(user)
  	@user = user
  	mail(to: User.where(admin: true).email, subject: 'Blog user contacted you')
  end

end
