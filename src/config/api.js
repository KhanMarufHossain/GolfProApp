// Base URL configuration - Update this as needed during testing phase
export const BASE_URL = 'http://192.168.0.107:5050/api/v1';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    SET_PASSWORD: '/auth/set-password',
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
  },
  PROFILE: {
    GET_MY_PROFILE: '/golfer/get-my-profile',
    UPDATE_PROFILE: '/golfer/update-my-profile',
  },
};
