class ContactAdminMessageController < ApplicationController

  def new
  	@message = ContactAdminMessage.new
  end

  def create
  	@message = ContactAdminMessage.new(message_params)

	#call mailer here and pass it the message
	render 'sent'  	
  end

end
