class CreateInvoices < ActiveRecord::Migration[8.0]
  def change
    create_table :invoices do |t|
      t.string :reference
      t.integer :amount
      t.boolean :paused

      t.timestamps
    end
  end
end
