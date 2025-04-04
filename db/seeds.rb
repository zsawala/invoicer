# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

User.find_or_create_by(first_name: 'Harry', last_name: 'Potter', email: 'harry.potter@gmail.com')
User.find_or_create_by(first_name: 'Ron', last_name: 'Weasly', email: 'ron.weasly@gmail.com')

10.times do |value|
  Invoice.create!(reference: SecureRandom.uuid, amount: Random.rand(100), paused: value.even?)
end
