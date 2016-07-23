class ArticlesController < ApplicationController

	before_action :authenticate_user!, :except => [:index, :show]

	def index
		@articles = Article.all.reverse_order
	end

	def new
		if can? :create, Article
			@article = Article.new
		    @photos = Photo.all
		else
			redirect_to welcome_index_path
		end
	end

	def create
		if can? :create, Article
			@article = Article.new(article_params)
		    @photos = Photo.all
    
			if @article.save 
				redirect_to @article
			else
				render 'new'
			end
		else
			redirect_to welcome_index_path
		end
	end

	def edit 
		if can? :edit, Article
			@article = Article.find(params[:id])
			@photos = Photo.all
			@photo = Photo.find_by(:id => @article.photo_uid)
		else
			redirect_to welcome_index_path
		end
	end

	def show
		if can? :show, Article
			@article = Article.find(params[:id])
			@comment = Comment.new(article_id: @article.id)
		else 
			redirect_to welcome_index_path
		end
	end

	def update
		if can? :update, Article
			@article = Article.find(params[:id])

			if @article.update(article_params)
				redirect_to @article
			else
				render 'edit'
			end
		else
			redirect_to welcome_index_path
		end
	end

	def destroy
		if can? :destroy, Article
			@article = Article.find(params[:id])
			@article.destroy

			redirect_to articles_path
		else 
			redirect_to welcome_index_path
		end
	end

	private

	def article_params
		params.require(:article).permit(:title, :text)
	end

end
