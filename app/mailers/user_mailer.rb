class UserMailer < ApplicationMailer

  def send_email_to_admin(user, message)
  	@user = user
  	@message = message
  	mail(to: User.find_by(:admin => true).email, subject: @message.subject)
  end

end
