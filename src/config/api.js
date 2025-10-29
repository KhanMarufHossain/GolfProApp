// Base URL configuration - Update this as needed during testing phase
export const BASE_URL = 'https://photographic-action-collaborative-statutory.trycloudflare.com/api/v1';

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
};
