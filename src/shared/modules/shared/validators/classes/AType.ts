/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseValidator } from '../BaseValidator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AType<T> {
  constructor(
    public readonly type: 'string' | 'number' | 'boolean' | 'array' | 'object',
    public readonly child?: AType<any>,
    public readonly validator?: new () => BaseValidator,
  ) {}

  public static STRING() {
    return new AType<string>('string');
  }

  public static NUMBER() {
    return new AType<number>('number');
  }

  public static BOOLEAN() {
    return new AType<boolean>('boolean');
  }

  public static ARRAY<T>(child: AType<T>) {
    return new AType('array', child);
  }

  public static OBJECT<T extends BaseValidator>(validator: new () => T) {
    return new AType<Infer<T>>('object', undefined, validator);
  }
}

export type Infer<T extends BaseValidator> = {
  [K in keyof T as T[K] extends AType<any> ? K : never]: T[K] extends AType<
    infer U
  >
    ? U
    : never;
};
