class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :password_digest, null: false
      t.string :remember_digest
      t.boolean :admin, null: false, default: false

      t.timestamps
    end
  end
end
