class CreateActivations < ActiveRecord::Migration[6.0]
  def change
    create_table :activations do |t|
      t.string :token, null: false, index: { unique: true }
      t.boolean :used, null: false, default: false

      t.timestamps
    end
  end
end
