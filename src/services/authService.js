import apiClient from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { tokenStorage } from '../utils/tokenStorage';

export const authService = {
  /**
   * Register a new user
   * @param {string} fullName - User's full name
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} role - User role: 'golfer' or 'golf_club'
   */
  register: async (fullName, email, password, role) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        role,
      });

      if (response.data.success) {
        const { user, accessToken } = response.data.data;
        
        // Store tokens and user data
        await tokenStorage.saveAccessToken(accessToken);
        await tokenStorage.saveUserData(user);
        
        return {
          success: true,
          user,
          accessToken,
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Registration failed',
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'An error occurred during registration',
      };
    }
  },

  /**
   * Login user
   * @param {string} email - User's email
   * @param {string} password - User's password
   */
  login: async (email, password) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      if (response.data.success) {
        const { user, accessToken, refreshToken } = response.data.data;
        
        // Store tokens and user data
        await tokenStorage.saveAccessToken(accessToken);
        await tokenStorage.saveRefreshToken(refreshToken);
        await tokenStorage.saveUserData(user);
        
        return {
          success: true,
          user,
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Login failed',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'An error occurred during login',
      };
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      // Call logout endpoint if needed
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear all stored data regardless of API response
      await tokenStorage.clearAll();
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: async () => {
    const token = await tokenStorage.getAccessToken();
    return !!token;
  },

  /**
   * Get current user data from storage
   */
  getCurrentUser: async () => {
    return await tokenStorage.getUserData();
  },

  /**
   * Send OTP to email for password reset
   * @param {string} email - User's email
   */
  sendOtp: async (email) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.SEND_OTP, {
        email,
      });

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'OTP sent successfully',
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Failed to send OTP',
      };
    } catch (error) {
      console.error('Send OTP error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'An error occurred while sending OTP',
      };
    }
  },

  /**
   * Verify OTP sent to email
   * @param {string} email - User's email
   * @param {string} otp - One-time password
   */
  verifyOtp: async (email, otp) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        email,
        otp,
      });

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'OTP verified successfully',
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Invalid OTP',
      };
    } catch (error) {
      console.error('Verify OTP error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'An error occurred while verifying OTP',
      };
    }
  },

  /**
   * Set new password after OTP verification (Forgot Password flow)
   * @param {string} email - User's email
   * @param {string} newPassword - New password
   * @param {string} confirmPassword - Confirm new password
   */
  setPassword: async (email, newPassword, confirmPassword) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.SET_PASSWORD, {
        email,
        newPassword,
        confirmPassword,
      });

      if (response.data.success) {
        return {
          success: true,
          message: response.data.message || 'Password set successfully',
        };
      }
      
      return {
        success: false,
        message: response.data.message || 'Failed to set password',
      };
    } catch (error) {
      console.error('Set password error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'An error occurred while setting password',
      };
    }
  },
};
