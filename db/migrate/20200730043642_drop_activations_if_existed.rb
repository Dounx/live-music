class DropActivationsIfExisted < ActiveRecord::Migration[6.0]
  def change
    drop_table :activations, if_exists: true
  end
end
