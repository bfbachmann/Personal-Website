class UserMailer < ApplicationMailer

  def send_email_to_admin(user, message)
  	@user = user
  	@message = message
  	mail(to: ENV['gmail_username'], subject: @message.subject)
  end

end
