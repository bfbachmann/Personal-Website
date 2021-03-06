class CommentsController < ApplicationController
	
	before_action :authenticate_user!

	def create
		@article = Article.find(params[:article_id])
		@comment = Comment.new(comment_params)
		@comment.article = @article
		@comment.user_id = current_user.id
		@comment.commenter = current_user.display_name

		if @comment.save 
			redirect_to @article
		else
			render 'articles/show'
		end

	end

	def destroy
		@article = Article.find(params[:article_id])
		@comment = @article.comments.find(params[:id])
		if can? :destroy, @comment
			@comment.destroy
			redirect_to article_path(@article)
		else
			redirect_to article_path(@article)
		end
	end

	private

	def comment_params
		params.require(:comment).permit(:commenter, :body)
	end

end