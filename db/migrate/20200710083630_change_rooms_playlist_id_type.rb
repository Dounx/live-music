class ChangeRoomsPlaylistIdType < ActiveRecord::Migration[6.0]
  def change
    change_column :rooms, :playlist_id, :bigint
  end
end
