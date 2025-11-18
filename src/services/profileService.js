import apiClient from '../utils/apiClient';
import { API_ENDPOINTS, BASE_URL } from '../config/api';
import { tokenStorage } from '../utils/tokenStorage';

const buildFormDataPayload = (data) => {
  if (data instanceof FormData) {
    return data;
  }

  const formData = new FormData();
  Object.entries(data || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    let normalizedValue = value;
    if (key === 'gender' && typeof value === 'string') {
      normalizedValue = value.toLowerCase();
    }

    formData.append(key, normalizedValue);
  });
  return formData;
};

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

export async function updateProfile(profileData) {
  try {
    console.log('🔵 [updateProfile] Updating profile');
    console.log('📤 [updateProfile] Data type:', profileData instanceof FormData ? 'FormData' : typeof profileData);

    const payload = buildFormDataPayload(profileData);

    if (payload?._parts) {
      console.log('📋 [updateProfile] FormData parts:', payload._parts.map(([key]) => key));
    }

    const token = await tokenStorage.getAccessToken();
    const headers = { Accept: 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${API_ENDPOINTS.PROFILE.UPDATE_PROFILE}`, {
      method: 'PATCH',
      headers,
      body: payload,
    });

    const json = await response.json();
    console.log('✅ [updateProfile] Response status:', response.status);

    if (response.ok && json?.success) {
      console.log('✅ [updateProfile] Update successful');
      return { ok: true, data: json.data, message: json.message };
    }

    console.log('❌ [updateProfile] Update failed - backend response indicates error');
    return { ok: false, data: null, message: json?.message || 'Failed to update profile' };
  } catch (error) {
    console.error('🔴 [updateProfile] Error:', error.message);
    console.error('🔴 [updateProfile] Full error:', error);
    if (typeof error?.toJSON === 'function') {
      console.error('🔴 [updateProfile] Error JSON:', error.toJSON());
    }
    if (error.request) {
      console.error('🔴 [updateProfile] Error request info:', {
        readyState: error.request.readyState,
        status: error.request.status,
        responseURL: error.request.responseURL,
      });
    }
    if (error.response) {
      console.error('🔴 [updateProfile] Response status:', error.response.status);
      console.error('🔴 [updateProfile] Response data:', error.response.data);
    }
    return { ok: false, data: null, message: error.response?.data?.message || error.message };
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
