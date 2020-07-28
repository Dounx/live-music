class RemoveMessagesChannelClass < ActiveRecord::Migration[6.0]
  def change
    remove_column :messages, :channel_class
  end
end
