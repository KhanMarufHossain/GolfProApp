// Base URL configuration - Update this as needed during testing phase
export const BASE_URL = 'https://tough-students-lot-taxi.trycloudflare.com/api/v1';

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
  EVENTS: {
    GET_EVENTS: '/events',
  },
  POSTS: {
    GET_ALL_POSTS: '/posts/get-all-posts',
    CREATE_POST: '/posts/create-new-post',
    LIKE_POST: (postId) => `/posts/like-post/${postId}`,
    ADD_COMMENT: (postId) => `/posts/add-comment/${postId}`,
  },
};

