class CreateContactAdminMessages < ActiveRecord::Migration
  def change
    create_table :contact_admin_messages do |t|
      t.string :email
      t.string :subject
      t.text :message

      t.timestamps null: false
    end
  end
end
