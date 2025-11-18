import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';

export async function fetchEvents() {
  try {
    console.log('🔵 [fetchEvents] Fetching events');
    const response = await apiClient.get(API_ENDPOINTS.EVENTS.GET_EVENTS);

    console.log('🟢 [fetchEvents] Response status:', response.status);
    console.log('📋 [fetchEvents] Payload keys:', Object.keys(response.data || {}));

    if (response.data?.events && Array.isArray(response.data.events)) {
      console.log('✅ [fetchEvents] Events received:', response.data.events.length);
      return { ok: true, data: response.data.events };
    }

    console.log('❌ [fetchEvents] Unexpected payload shape');
    return { ok: false, data: [] };
  } catch (error) {
    console.error('🔴 [fetchEvents] Error:', error.message);
    if (error.response) {
      console.error('🔴 [fetchEvents] Response status:', error.response.status);
      console.error('🔴 [fetchEvents] Response data:', error.response.data);
    }
    return { ok: false, data: [], message: error.response?.data?.message || error.message };
  }
}
