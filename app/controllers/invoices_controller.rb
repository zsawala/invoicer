# frozen_string_literal: true

class InvoicesController < ApplicationController
  layout "invoicer"
  def index
    @users = User.order(:created_at)
    @invoices = Invoice.all
  end
end
