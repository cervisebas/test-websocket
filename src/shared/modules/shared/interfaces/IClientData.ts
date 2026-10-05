/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IClientData<T extends object = object> {
  path: string;
  params: Record<string, any>;
  data: T;
}
