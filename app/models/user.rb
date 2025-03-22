class User < ApplicationRecord
  has_many :views
  # has_one :base_view, -> { find_by(base: true) }, class_name: "View", foreign_key: "user_id", inverse_of: :user
end
