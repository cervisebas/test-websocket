/* eslint-disable @typescript-eslint/no-explicit-any */
import { Responses } from '@messages/EvalResponse';
import type { IClientData } from '../interfaces/IClientData';
import type { BaseValidator } from '../validators/BaseValidator';

export function ModulePath(path: string, validator?: new () => BaseValidator) {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    let actionMethods = (target as any)['__actionMethods'] as Map<
      string,
      (data: IClientData) => any
    >;

    if (!('__actionMethods' in target)) {
      Object.assign(target, {
        __actionMethods: new Map<string, (data: IClientData) => any>(),
      });
      actionMethods = (target as any)['__actionMethods'];
    }

    const originalDescriptorValue = descriptor.value;
    descriptor.value = async function (info: IClientData) {
      if (validator && !new validator().isValid(info.data)) {
        return Responses.BAD_REQUEST();
      }

      return await originalDescriptorValue(info);
    };

    if ('__actionMethods' in target) {
      actionMethods.set(path, descriptor.value);
    }
  };
}
