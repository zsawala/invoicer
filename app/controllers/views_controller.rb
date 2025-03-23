# frozen_string_literal: true

class ViewsController < ApplicationController
  def index
    views = View.where(user_id: params[:user_id]).order(:created_at)

    render json: { success: true, views: views.as_json }, status: 200
  end

  def create
    view = View.new(view_params)

    if view.save
      render json: { success: true, view: view.as_json }, status: 201
    else
      render json: { success: false, errors: view.errors.full_messages }, status: 422
    end
  end

  def update
    view = View.find_by(id: params[:id])

    if view.update(view_params)
      render json: { success: true, view: view.as_json }, status: 200
    else
      render json: { success: false, errors: view.errors.full_messages }, status: 422
    end
  end

  private

  def view_params
    params.require(:view).permit(
      :user_id, visibility: {}, filters: [ :field, :id, :operator, :value, value: [] ]
    )
  end
end
