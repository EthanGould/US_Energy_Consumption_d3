class AddPictureToState < ActiveRecord::Migration
  def change
    add_column :states, :url, :text
  end
end
