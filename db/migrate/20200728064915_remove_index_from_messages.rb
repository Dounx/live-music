class RemoveIndexFromMessages < ActiveRecord::Migration[6.0]
  def change
    remove_index :messages, [:from_class, :from_id]
    remove_index :messages, [:to_class, :to_id]
  end
end
