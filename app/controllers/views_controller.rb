# frozen_string_literal: true

class ViewsController < ApplicationController
  def show
    binding.b
    @view = if params[:id]
      View.find(params[:id])
    else
      View.find_by(base: true)
    end
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
    params.require(:view).permit(:base, :visibility, filters: [ :field, :id, :operator, :value ])
  end
end
