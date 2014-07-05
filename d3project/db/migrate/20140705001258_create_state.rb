class CreateState < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string :name
      t.string :abrev
    end
  end
end
