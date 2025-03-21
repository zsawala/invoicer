FactoryBot.define do
  factory :view do
    base { false }
    filters { [] }
    visibility { { reference: true, amount: true, paused: false } }
  end
end
