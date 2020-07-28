class AddIndexToMessages < ActiveRecord::Migration[6.0]
  def change
    add_index :messages, %i[from_class from_id]
    add_index :messages, %i[to_class to_id]
  end
end
