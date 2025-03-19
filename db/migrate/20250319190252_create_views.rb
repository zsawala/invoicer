class CreateViews < ActiveRecord::Migration[8.0]
  def change
    create_table :views do |t|
      t.references :user, null: false, foreign_key: true
      t.jsonb :visibility, null: false, default: []
      t.jsonb :filters, null: false, default: {}
      t.jsonb :base, null: false, default: false

      t.timestamps
    end
  end
end
