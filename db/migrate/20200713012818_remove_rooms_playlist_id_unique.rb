class RemoveRoomsPlaylistIdUnique < ActiveRecord::Migration[6.0]
  def change
    remove_index :rooms, :playlist_id
    add_index :rooms, :playlist_id
  end
end
