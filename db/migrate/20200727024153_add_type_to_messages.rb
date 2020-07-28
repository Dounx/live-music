class AddTypeToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :type, :string
    add_index :messages, :type
  end
end
