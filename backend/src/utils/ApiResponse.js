export function sendSuccess(
  res,
  { statusCode = 200, message = "Success", data = null, meta } = {},
) {
  const body = { success: true, message };
  if (data) body.data = data;
  if (meta) body.meta = meta;
  return res.status(statusCode).json(body);
}

export function sendError(res, { statusCode = 400, message = "Failed" } = {}) {
  const body = { success: false, message };
  return res.status(statusCode).json(body);
}