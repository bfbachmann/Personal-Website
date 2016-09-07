class MessagesController < ApplicationController
  
  def new
  	@message = Message.new
  	@user = current_user
  end

  def create
  	if can? :create, Message 
	  	@message = Message.new(message_params)
	  	@message.user = current_user
		@message.user_id = current_user.id

		if @message.user_email.nil?
			@message.user_email = current_user.email
		end

	  	if @message.save
	  		UserMailer.send_email_to_admin(current_user, @message).deliver
	  		render '/messages/success'
	  	else
	  		@user = current_user
	  		render '/messages/failure'
	  	end
	else
		redirect_to welcome_index_path
	end
  end

  private

  def message_params
  	params.require(:message).permit(:subject, :body, :user_email)
  end

end
