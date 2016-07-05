class ChangeContactAdminMessageToMessage < ActiveRecord::Migration
  def change
  	rename_table :contact_admin_messages, :message
  end
end
