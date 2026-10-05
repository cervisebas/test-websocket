export function makeResponse(code: number, defaultMessage?: string) {
  return function <T>(data?: T, message?: string) {
    return { code, message: message ?? defaultMessage, data };
  };
}
