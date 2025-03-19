# frozen_string_literal: true

class InvoicesController < ApplicationController
  layout "hello_world"
  def index
    @users = User.all
    @invoices = Invoice.all
    @base_view = View.find_by(base: true)
  end
end
