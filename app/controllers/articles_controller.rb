class ArticlesController < ApplicationController

	before_action :authenticate_user!, :except => [:index, :show]

	def index
		@articles = Article.where.not(photo_uid: nil, published: false).reverse_order
		@unpublished = Article.find_by_sql('SELECT "articles".* FROM "articles" WHERE "articles"."photo_uid" IS NULL OR "articles"."published" = "f"')
		@photos = Photo.all

		render layout: 'all_articles'
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
			@article.published = false
		    @photos = Photo.all
    
			if @article.save 
				render 'edit'
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

	def publish
		if can? :update, Article
			@article = Article.find(params[:article_id])
			@photos = Photo.all

			@article.published = params[:publish]

			if @article.save
				redirect_to articles_path
			else 
				render 'edit'
			end
		else
			redirect_to welcome_index_path
		end
	end

	private

	def article_params
		params.require(:article).permit(:title, :text)
	end

end
