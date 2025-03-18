# frozen_string_literal: true

class InvoicesController < ApplicationController
  layout "hello_world"

  def index
    @users = User.all
  end
end
