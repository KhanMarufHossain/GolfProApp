import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';

export async function fetchFeed() {
  try {
    console.log('🔵 [fetchFeed] Fetching all posts');
    const response = await apiClient.get(API_ENDPOINTS.POSTS.GET_ALL_POSTS);
    
    console.log('🟢 [fetchFeed] API Response received');
    console.log('📊 [fetchFeed] Response status:', response.status);
    console.log('📋 [fetchFeed] Response data:', JSON.stringify(response.data, null, 2));
    
    // API returns { success, message, data: [] }
    if (response.data && response.data.success && response.data.data) {
      console.log('✅ [fetchFeed] Posts fetched successfully:', response.data.data.length);
      return { ok: true, data: response.data.data };
    }
    console.log('❌ [fetchFeed] Response not ok or no data');
    return { ok: false, data: [] };
  } catch (error) {
    console.error('🔴 [fetchFeed] Error:', error.message);
    console.error('🔴 [fetchFeed] Full error:', error);
    if (error.response) {
      console.error('🔴 [fetchFeed] Response status:', error.response.status);
      console.error('🔴 [fetchFeed] Response data:', error.response.data);
    }
    return { ok: false, data: [] };
  }
}

export async function createPost(postData) {
  try {
    console.log('🔵 [createPost] Creating new post');
    console.log('📤 [createPost] Post data:', postData instanceof FormData ? 'FormData' : postData);
    
    const response = await apiClient.post(API_ENDPOINTS.POSTS.CREATE_POST, postData);
    
    console.log('🟢 [createPost] API Response received');
    console.log('📊 [createPost] Response status:', response.status);
    console.log('📋 [createPost] Response data:', JSON.stringify(response.data, null, 2));
    
    // API returns { success, message, data: {...newPost} }
    if (response.data && response.data.success && response.data.data) {
      console.log('✅ [createPost] Post created successfully');
      return { ok: true, data: response.data.data };
    }
    console.log('❌ [createPost] Response not ok or no data');
    return { ok: false, data: null, message: response.data?.message };
  } catch (error) {
    console.error('🔴 [createPost] Error:', error.message);
    console.error('🔴 [createPost] Full error:', error);
    if (error.response) {
      console.error('🔴 [createPost] Response status:', error.response.status);
      console.error('🔴 [createPost] Response data:', error.response.data);
    }
    return { ok: false, data: null, message: error.response?.data?.message || error.message };
  }
}

export async function likePost(postId) {
  try {
    console.log('🔵 [likePost] Liking post:', postId);
    const response = await apiClient.post(API_ENDPOINTS.POSTS.LIKE_POST(postId));
    
    if (response.data && response.data.success && response.data.data) {
      console.log('✅ [likePost] Post liked successfully');
      return { ok: true, data: response.data.data };
    }
    return { ok: false, data: null };
  } catch (error) {
    console.error('🔴 [likePost] Error:', error.message);
    return { ok: false, data: null };
  }
}

export async function addComment(postId, commentData) {
  try {
    console.log('🔵 [addComment] Adding comment to post:', postId);
    const response = await apiClient.post(API_ENDPOINTS.POSTS.ADD_COMMENT(postId), commentData);
    
    if (response.data && response.data.success && response.data.data) {
      console.log('✅ [addComment] Comment added successfully');
      return { ok: true, data: response.data.data };
    }
    return { ok: false, data: null };
  } catch (error) {
    console.error('🔴 [addComment] Error:', error.message);
    return { ok: false, data: null };
  }
}
