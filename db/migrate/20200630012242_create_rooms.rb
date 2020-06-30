class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.integer :playlist_id
      t.references :user

      t.timestamps
    end
  end
end
