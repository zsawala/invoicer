class User < ApplicationRecord
  has_many :views
  has_one :base_view, -> { find_by(base: true) }
end
