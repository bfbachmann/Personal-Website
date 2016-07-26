class PhotosController < ApplicationController
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
        redirect_to welcome_index_path
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
end
