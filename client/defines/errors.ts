import { isString } from 'utils/validator/common';

const ERROR_VARIANTS = ['CE', 'EE'] as const;
type ErrorCode = `${typeof ERROR_VARIANTS[number]}${number}`;

export interface CustomError {
  code: ErrorCode;
  name: string;
  message: string;
}

export function isCustomError(error: any): error is CustomError {
  const { code, name, message } = error;

  if (!isString(code, { minLength: 5, maxLength: 5 }) || !isString(name) || !isString(message)) {
    return false;
  }

  return true;
}

export function createError(
  errName: keyof typeof ERRORS,
  overrides?: Partial<Omit<CustomError, 'code'>>,
): CustomError {
  const err = ERRORS[errName];
  return {
    code: err.code,
    name: overrides?.name || err.name,
    message: overrides?.message || err.message,
  };
}

const ERRORS = {
  // Common Error
  INTERNAL_SERVER_ERROR: {
    code: 'CE000',
    name: 'Internal server error',
    message: 'Unhandled error occured.',
  },
  METHOD_NOT_EXISTS: {
    code: 'CE001',
    name: 'Bad request method',
    message: 'Check request host and/or method.',
  },
  VALIDATION_FAILED: {
    code: 'CE002',
    name: 'Validation failed',
    message: "Check your request's validity.",
  },
  NO_PERMISSION: {
    code: 'CE003',
    name: 'No permission',
    message: 'You should register your domain to the referrer whitelist first.',
  },

  // External Error
  AWS_ERROR: {
    code: 'EE001',
    name: 'AWS error',
    message: '',
  },
  KAKAO_ERROR: {
    code: 'EE002',
    name: 'Kakao error',
    message: '',
  },
} as const;

export default ERRORS;
