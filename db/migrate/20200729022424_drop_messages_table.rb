class DropMessagesTable < ActiveRecord::Migration[6.0]
  def change
    drop_table :messages
  end
end
