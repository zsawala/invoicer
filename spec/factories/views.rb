FactoryBot.define do
  factory :view do
    filters { [] }
    visibility { { reference: true, amount: true, paused: false } }
  end
end
