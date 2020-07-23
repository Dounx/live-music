class AddTokenToRooms < ActiveRecord::Migration[6.0]
  def change
    add_column :rooms, :token, :string, null: false
    add_index :rooms, :token, unique: true
  end
end
