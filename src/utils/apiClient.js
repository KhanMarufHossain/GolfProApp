import axios from 'axios';
import { BASE_URL, API_ENDPOINTS } from '../config/api';
import { tokenStorage } from './tokenStorage';
import { reset } from './navigationRef';

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor to add access token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
   
    
    console.log(`🌐 [apiClient] ${config.method?.toUpperCase()} ${config.url}`);
    console.log(`🔑 [apiClient] Has auth token: ${!!token}`);
    console.log(`📦 [apiClient] Data type: ${config.data instanceof FormData ? 'FormData' : typeof config.data}`);
    
    return config;
  },
  (error) => {
    console.error('🔴 [apiClient] Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ [apiClient] ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  async (error) => {
    console.error('🔴 [apiClient] Response error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: error.config?.url,
    });
    
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await tokenStorage.getRefreshToken();
        
        if (!refreshToken) {
          // No refresh token, clear storage and navigate to login
          await tokenStorage.clearAll();
          reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
          return Promise.reject(error);
        }

        // Call refresh token endpoint
        const response = await axios.post(
          `${BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        if (response.data.success && response.data.data.accessToken) {
          const newAccessToken = response.data.data.accessToken;
          
          // Save new access token
          await tokenStorage.saveAccessToken(newAccessToken);
          
          // Update the authorization header
          apiClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          // Process queued requests
          processQueue(null, newAccessToken);
          
          // Retry original request
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear all tokens
        processQueue(refreshError, null);
        await tokenStorage.clearAll();
        
        // Navigate to login screen
        reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
