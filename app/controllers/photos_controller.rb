class PhotosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_s3_direct_post, only: [:new, :edit, :create, :update]

  def index
    if can? :read, Photo
      @photos = Photo.order('created_at')
      render layout: 'layouts/photo'
    else 
      redirect_to root_path
    end
  end

  def new
    if can? :create, Photo
      @photo = Photo.new
    else
      redirect_to root_path
    end
  end

  def create
    if can? :create, Photo
      @photo = Photo.new(photo_params)
      if @photo.save
        redirect_to photos_path
      else
        render 'new'
      end
    else
      redirect_to root_path
    end
  end

  def destroy
    if can? :destroy, Photo
      @photo = Photo.find(params[:id])
      @photo.destroy

      redirect_to photos_path
    else
      redirect_to root_path
    end
  end

  def update
    if can? :update, Photo
      @article = Article.find(params[:article_id])
      @photo = Photo.find(params[:id])

      @article.photo_uid = @photo.id
      @photo.article_id = @article.id

      if @article.save and @photo.save
        redirect_to edit_article_path(@article)
      else
        @photos = Photo.all
        render 'articles/edit'
      end
    else
      redirect_to root_path
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:image, :title)
  end

  def set_s3_direct_post
    @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
  end
end
