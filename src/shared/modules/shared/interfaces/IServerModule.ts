/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IClientData } from './IClientData';

export type FunctionModuleType = Record<string, (data: IClientData) => any>;

export interface IServerModule {
  nameRoute: string;
  // functions: FunctionModuleType;
  evalRequest(route: string, data: IClientData): Promise<any>;
}
