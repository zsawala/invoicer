class RemoveBaseFromViews < ActiveRecord::Migration[8.0]
  def change
    remove_column :views, :base
  end
end
