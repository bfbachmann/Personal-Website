class RemoveImageUrlFromPhotos < ActiveRecord::Migration
  def change
  	remove_column :photos, :image_url
  end
end
