# frozen_string_literal: true

require 'rails_helper'

describe ViewsController, type: :request do
  let(:user) { create(:user, first_name: 'Test', last_name: 'First') }
  let(:user2) { create(:user, first_name: 'Test', last_name: 'Second') }

  let!(:view_for_user) { create(:view, visibility: { reference: 'false' }, user: user) }
  let!(:view_for_user2) { create(:view, visibility: { amount: 'false' }, user: user2) }

  context '#index' do
    let(:request) { get "/users/#{user.id}/views" }

    it 'returns all user views' do
      request
      expect(response).to be_successful
      expect(response.parsed_body['views']).to eq([ view_for_user ].as_json)
    end
  end

  context '#create' do
    let(:request) do
      post "/users/#{user.id}/views", params: { view: { user_id: user_id, visibility: { paused: true } } }
    end

    context 'with success' do
      let(:user_id) { user.id }

      it 'returns success' do
        expect { request }.to change { user.views.count }.by(1)
        expect(response).to be_successful
        expect(response.parsed_body['view']).not_to be_nil
      end
    end

    context 'with failure' do
      let(:user_id) { nil }

      it 'returns failure' do
        expect { request }.not_to change { user.views.count }
        expect(response).not_to be_successful
        expect(response.parsed_body['view']).to be_nil
      end
    end
  end

  context '#update' do
    let(:request) do
      put "/users/#{user.id}/views/#{view_for_user.id}",
          params: { view: { user_id: user_id, visibility: { paused: true } } }
    end

    context 'with success' do
      let(:user_id) { user.id }

      it 'returns success' do
        expect { request }.to change { view_for_user.reload.visibility }.
          from({ 'reference' => false }).to({ 'paused' => 'true' })
        expect(response).to be_successful
        expect(response.parsed_body['view']).not_to be_nil
      end
    end

    context 'with failure' do
      let(:user_id) { nil }

      it 'returns failure' do
        expect { request }.not_to change { user.views.count }
        expect(response).not_to be_successful
        expect(response.parsed_body['view']).to be_nil
      end
    end
  end
end
