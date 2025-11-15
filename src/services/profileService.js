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

export async function updateProfile(profileData) {
  try {
    console.log('🔵 [updateProfile] Updating profile');
    console.log('📤 [updateProfile] Data type:', profileData instanceof FormData ? 'FormData' : typeof profileData);
    
    // If it's FormData (for image uploads), send it directly
    if (profileData instanceof FormData) {
      console.log('📤 [updateProfile] Using provided FormData (image upload)');
      const response = await apiClient.patch(API_ENDPOINTS.PROFILE.UPDATE_PROFILE, profileData);
      console.log('✅ [updateProfile] Response received:', response.status);
      
      if (response.data && response.data.success) {
        console.log('✅ [updateProfile] Update successful');
        return { ok: true, data: response.data.data, message: response.data.message };
      }
      console.log('❌ [updateProfile] Update failed - no success in response');
      return { ok: false, data: null, message: response.data?.message };
    }
    
    // For regular JSON updates (text fields only), send as JSON
    console.log('📤 [updateProfile] Sending JSON update');
    console.log('📋 [updateProfile] Fields:', Object.keys(profileData));
    
    // Clean and normalize the data
    const normalizedData = {};
    
    // Only include fields that have values (not empty strings or null)
    Object.keys(profileData).forEach(key => {
      let value = profileData[key];
      
      // Skip undefined and empty string values
      if (value === '' || value === undefined) {
        console.log(`📝 [updateProfile] Skipping empty field: ${key}`);
        return;
      }
      
      // Normalize gender field to lowercase if present (backend expects lowercase enum values)
      if (key === 'gender' && typeof value === 'string') {
        value = value.toLowerCase();
        console.log(`📝 [updateProfile] Normalized gender to lowercase: ${value}`);
      }
      
      normalizedData[key] = value;
    });
    
    console.log('📋 [updateProfile] Cleaned data keys:', Object.keys(normalizedData));
    
    const response = await apiClient.patch(API_ENDPOINTS.PROFILE.UPDATE_PROFILE, normalizedData);
    console.log('✅ [updateProfile] Response received:', response.status);
    
    if (response.data && response.data.success) {
      console.log('✅ [updateProfile] Update successful');
      return { ok: true, data: response.data.data, message: response.data.message };
    }
    console.log('❌ [updateProfile] Update failed - no success in response');
    return { ok: false, data: null, message: response.data?.message };
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
