import authService from './auth.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return successResponse(res, result, 'Registered successfully', 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const result = await authService.login(email, password, role);
    return successResponse(res, result, 'Logged in successfully');
  } catch (err) {
    return errorResponse(res, err.message, 401);
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const { target } = req.body;
    const result = authService.sendOtp(target);
    return successResponse(res, result);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { target, code } = req.body;
    const result = authService.verifyOtp(target, code);
    return successResponse(res, result);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const email = req.query.email;
    if (!email) {
      return errorResponse(res, 'Email query parameter required', 400);
    }
    const user = await authService.findByEmail(email);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    return successResponse(res, user);
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
  sendOtp,
  verifyOtp,
  getMe,
};
