export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json(data);
};

export const errorResponse = (res, message = 'Internal Server Error', statusCode = 500, details = null) => {
  const payload = { error: message };
  if (details) {
    payload.details = details;
  }
  return res.status(statusCode).json(payload);
};
