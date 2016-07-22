class RemoveImageUidFromArticles < ActiveRecord::Migration
  def change
  	remove_column :articles, :image_uid
  end
end
