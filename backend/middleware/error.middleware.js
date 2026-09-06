import { errorResponse } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  console.error('[Error Middleware]:', err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return errorResponse(res, message, status, process.env.NODE_ENV === 'development' ? err.stack : null);
};

export default errorHandler;
