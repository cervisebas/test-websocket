/* eslint-disable @typescript-eslint/no-explicit-any */
import { Responses } from '@messages/EvalResponse';
import type { IClientData } from '../interfaces/IClientData';

export function ModuleResolver() {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    descriptor.value = async function (route: string, data: IClientData) {
      try {
        const methods = (target as any)['__actionMethods'] as Map<
          string,
          (data: IClientData) => any
        >;
        const selectedMethod = methods.get(route);

        if (!selectedMethod) {
          return Responses.NOT_FOUND();
        }

        return Responses.OK(await selectedMethod(data));
      } catch (error) {
        console.error(error);
        return Responses.INTERNAL_ERROR();
      }
    };
  };
}
