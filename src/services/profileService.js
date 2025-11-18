import { Platform } from 'react-native';
import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';

const isFileAsset = (value) => value && typeof value === 'object' && typeof value.uri === 'string';

const getFileExtension = (value) => {
  const nameCandidate = value?.fileName || value?.name || value?.uri;
  if (!nameCandidate || typeof nameCandidate !== 'string' || !nameCandidate.includes('.')) {
    return 'jpg';
  }
  const lastChunk = nameCandidate.split('?')[0];
  return lastChunk.split('.').pop().toLowerCase() || 'jpg';
};

const normalizeFileAsset = (value) => {
  if (!isFileAsset(value)) {
    return value;
  }

  const extension = getFileExtension(value);
  const normalizedName = value.fileName || value.name || `upload-${Date.now()}.${extension}`;
  const providedType = value.mimeType || value.type;
  const mimeType = providedType && providedType.includes('/')
    ? providedType
    : `image/${extension === 'jpg' ? 'jpeg' : extension}`;

  let normalizedUri = value.uri;
  if (Platform.OS === 'ios' && typeof normalizedUri === 'string' && normalizedUri.startsWith('file://')) {
    normalizedUri = normalizedUri.replace('file://', '');
  }

  return {
    uri: normalizedUri,
    type: mimeType || 'application/octet-stream',
    name: normalizedName,
  };
};

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

    if (isFileAsset(normalizedValue)) {
      normalizedValue = normalizeFileAsset(normalizedValue);
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

    const headers = payload instanceof FormData
      ? { 'Content-Type': 'multipart/form-data', Accept: 'application/json' }
      : { Accept: 'application/json' };

    const response = await apiClient.patch(
      API_ENDPOINTS.PROFILE.UPDATE_PROFILE,
      payload,
      { headers }
    );

    console.log('✅ [updateProfile] Response status:', response.status);
    const { data } = response;

    if (data?.success) {
      console.log('✅ [updateProfile] Update successful');
      return { ok: true, data: data.data, message: data.message };
    }

    console.log('❌ [updateProfile] Update failed - backend response indicates error');
    return { ok: false, data: null, message: data?.message || 'Failed to update profile' };
  } catch (error) {
    console.error('🔴 [updateProfile] Error:', error.message);
    console.error('🔴 [updateProfile] Full error:', error);
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
