# frozen_string_literal: true

class ViewsController < ApplicationController
  def index
    views = View.where(user_id: params[:user_id])

    render json: { success: true, views: views.as_json }, status: 200
  end

  def show
    view = View.find(params[:id])

    render json: { success: true, view: view.as_json }, status: 200
  end

  def base_show
    view = View.find_by(user_id: params[:user_id], base: true) || View.new(filters: [], visibility: {}, base: true)

    render json: { success: true, view: view.as_json }, status: 200
  end

  def create
    view = View.new(view_params)

    if view.save
      render json: { success: true, view: view.as_json }, status: 201
    else
      render json: { success: false, errors: view.errors.full_messages }
    end
  end

  def update
    view = View.find_by(id: params[:id])

    if view.update(view_params)
      render json: { success: true, view: view.as_json }
    else
      render json: { success: false, errors: view.errors.full_messages }
    end
  end

  private

  def view_params
    params.require(:view).permit(:base, :user_id, visibility: {}, filters: [ :field, :id, :operator, value: [] ])
  end
end
