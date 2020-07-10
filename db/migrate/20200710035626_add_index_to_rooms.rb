class AddIndexToRooms < ActiveRecord::Migration[6.0]
  def change
    add_index :rooms, :playlist_id, unique: true
  end
end
