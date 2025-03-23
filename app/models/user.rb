class User < ApplicationRecord
  has_many :views

  validates :first_name, :last_name, presence: true
end
