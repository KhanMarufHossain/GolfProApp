import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';

export async function getProfile() {
  try {
    console.log('🔵 [getProfile] Fetching profile from:', API_ENDPOINTS.PROFILE.GET_MY_PROFILE);
    const response = await apiClient.get(API_ENDPOINTS.PROFILE.GET_MY_PROFILE);
    
    console.log('🟢 [getProfile] API Response received');
    console.log('📊 [getProfile] Response status:', response.status);
    console.log('📋 [getProfile] Response data:', JSON.stringify(response.data, null, 2));
    console.log('🔑 [getProfile] Response keys:', Object.keys(response.data || {}));
    
    // The API returns the profile object directly
    if (response.data && response.data._id) {
      console.log('✅ [getProfile] Profile valid, returning data');
      return { ok: true, data: response.data };
    }
    console.log('❌ [getProfile] Profile invalid, no _id found');
    return { ok: false, data: null };
  } catch (error) {
    console.error('🔴 [getProfile] Error:', error.message);
    console.error('🔴 [getProfile] Full error:', error);
    if (error.response) {
      console.error('🔴 [getProfile] Response status:', error.response.status);
      console.error('🔴 [getProfile] Response data:', error.response.data);
    }
    return { ok: false, data: null };
  }
}

export async function updateProfile(patch) {
  try {
    const response = await apiClient.patch(API_ENDPOINTS.PROFILE.UPDATE_PROFILE, patch);
    if (response.data && response.data.success) {
      return { ok: true, data: response.data.data };
    }
    return { ok: false, data: null };
  } catch (error) {
    console.error('Failed to update profile:', error);
    return { ok: false, data: null };
  }
}

export async function getMyPosts() {
  // This endpoint is not available in the current API, using empty array for now
  return { ok: true, data: [] };
}

export async function getMyScorecards() {
  // This endpoint is not available in the current API, using empty array for now
  return { ok: true, data: [] };
}
