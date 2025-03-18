# frozen_string_literal: true

class InvoicesController < ApplicationController
  layout "hello_world"

  def index
    @users = User.all
    @invoices = [ {
      id: 1,
      reference: "1234",
      amount: 2,
      paused: true
    }, {
      id: 2,
      reference: "87686",
      amount: 3,
      paused: false
    } ]
  end
end
