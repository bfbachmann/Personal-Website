class DropMessagesTable < ActiveRecord::Migration
  def change
  	drop_table :message
  end
end
