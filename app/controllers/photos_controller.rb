class PhotosController < ApplicationController
  def index
    @photos = Photo.order('created_at')
    render layout: 'layouts/welcome'
  end

  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new(photo_params)
    if @photo.save
      redirect_to photos_path
    else
      render 'new'
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy

    redirect_to photos_path
  end

  private

  def photo_params
    params.require(:photo).permit(:image, :title)
  end
end
