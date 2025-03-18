# frozen_string_literal: true

class SessionsController < ApplicationController
  layout "hello_world"

  def update
    session[:current_user_id] = params[:id]
  end
end
