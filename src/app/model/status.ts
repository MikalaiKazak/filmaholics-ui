export interface StatusResponse {
    status_code: number;
    status_message: string;
}

export enum StatusCode {
    SUCCESS = 1,
    INVALID_SERVICE = 2,
    DO_NOT_PERMISSIONS = 3,
    INVALID_FORMAT = 4,
    INVALID_PARAMETERS = 5,
    INVALID_ID = 6,
    INVALID_API_KEY = 7,
    DUPLICATE_ENTRY = 8,
    SERVICE_OFFLINE = 9,
    SUSPENDED_API_KEY = 10,
    INTERNAL_SERVER_ERROR = 11,
    UPDATED = 12,
    DELETED = 13,
    AUTHENTICATION_FAILED = 14,
    FAILED = 15,
    DEVICE_DENIED = 16,
    SESSION_DENIED = 17,
    VALIDATION_FAILED = 18,
    INVALID_ACCEPT_HEADER = 19,
    INVALID_DATE_RANGE = 20,
    ENTRY_NOT_FOUND = 21,
    INVALID_PAGE = 22,
    INVALID_DATE = 23,
    TIME_OUT = 24,
    REQUEST_LIMIT = 25,
    USER_CRED = 26,
    MAX_REMOTE_CALL = 27,
    INVALID_TIMEZONE = 28,
    PROVIDE_CONFIRM = 29,
    INVALID_USER_CRED = 30,
    ACCOUNT_DISABLED = 31,
    EMAIL_NOT_VERIFIED = 32,
    INVALID_REQUEST_TOKEN = 33,
    REQUEST_COULD_NOT_FOUND = 34
}
