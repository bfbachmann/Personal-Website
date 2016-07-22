class ChangeArticleImageuidToPhotouid < ActiveRecord::Migration
  def change
  	rename_column :articles, :image_uid, :photo_uid
  end
end
