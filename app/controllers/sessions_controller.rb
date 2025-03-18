# frozen_string_literal: true

class UsersController < ApplicationController
  layout "hello_world"

  def update
    @users = User.all
  end
end
