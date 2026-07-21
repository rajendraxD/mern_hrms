// User roles
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  HR: 'hr',
  EMPLOYEE: 'employee',
}

export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 0,
  [ROLES.MANAGER]: 1,
  [ROLES.HR]: 2,
  [ROLES.EMPLOYEE]: 3,
}

// Pagination
export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 10
export const MAX_LIMIT = 100

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY: 429,
  INTERNAL_SERVER: 500,
}

// Auth
export const BCRYPT_SALT_ROUNDS = 12
export const MAX_LOGIN_ATTEMPTS = 5
export const LOCK_TIME = 30 * 60 * 1000 // 30 minutes
