class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :action
      t.string :channel_class
      t.text :data
      t.string :from_class
      t.string :to_class
      t.bigint :from_id
      t.bigint :to_id
      t.timestamps
    end
  end
end
