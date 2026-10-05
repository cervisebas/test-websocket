// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toJSON(message: any) {
  try {
    if (!(typeof message === 'string')) {
      return null;
    }

    return JSON.parse(message);
  } catch (error) {
    console.error(error);
    return null;
  }
}
