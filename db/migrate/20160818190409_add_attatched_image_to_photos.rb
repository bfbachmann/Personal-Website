class AddAttatchedImageToPhotos < ActiveRecord::Migration
  def self.up
    add_attachment :photos, :attached_image
  end

  def self.down
    remove_attachment :photos, :attached_image
  end
end
