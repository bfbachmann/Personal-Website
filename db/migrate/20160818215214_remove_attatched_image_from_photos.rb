class RemoveAttatchedImageFromPhotos < ActiveRecord::Migration
  def change
  	remove_column :photos, :attached_image_file_name
  	remove_column :photos, :attached_image_content_type
  	remove_column :photos, :attached_image_file_size
  	remove_column :photos, :attached_image_updated_at
  end
end
