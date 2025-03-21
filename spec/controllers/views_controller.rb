# frozen_string_literal: true

require 'rails_helper'

describe ViewsController, type: :request do
  subject(:request) do
    get(
      '/',
      params: { access_token: admin_access_token, location_id: location_id }
    )
  end

  let(:location) { create(:location) }
  let(:facilities) { create(:shop, :facilities, enabled: true, location: location) }

  context '#get' do
  end

  context '#create' do
  end

  context '#update' do
  end

  contex '#get_base' do
  end

  context 'when no location id' do
    let(:location_id) { nil }

    before { request }

    it 'returns not found' do
      expect_response_to_have_http_status(:not_found)
    end
  end

  context 'when no categories shop' do
    let(:location_id) { location.id }

    before { request }

    it 'returns not found' do
      expect_response_to_have_http_status(:not_found)
    end
  end

  context 'when config not enabled' do
    let(:location_id) { location.id }

    before do
      facilities
      stub_config('frontend.modules.marketplace.facilities.enabled', false, stub_locations: true)
      request
    end

    it 'returns not found' do
      expect_response_to_have_http_status(:not_found)
    end
  end

  context 'when config enabled' do
    let(:location_id) { location.id }

    before do
      facilities
      stub_config('frontend.modules.marketplace.facilities.enabled', true, stub_locations: true)
      request
    end

    it 'returns shop' do
      aggregate_failures do
        expect_response_to_have_http_status(:ok)
        expect(response.parsed_body.dig('shop', 'id')).to eq(facilities.id)
      end
    end

    context 'when facitlities not active' do
      let(:facilities) { create(:shop, :facilities, enabled: false, location: location) }

      it 'returns not found' do
        expect_response_to_have_http_status(:not_found)
      end
    end
  end
end
