/* eslint-disable @typescript-eslint/no-explicit-any */
import { AType } from './classes/AType';

export abstract class BaseValidator {
  public isValid(data: Record<string, any>): boolean {
    if (data == null || typeof data !== 'object' || Array.isArray(data)) {
      return false;
    }

    for (const [key, type] of Object.entries(this)) {
      if (!this.validate(type as AType<any>, data[key])) {
        return false;
      }
    }

    return true;
  }

  private validate(type: AType<any>, value: any): boolean {
    switch (type.type) {
      case 'string':
        return typeof value === 'string';

      case 'number':
        return typeof value === 'number' && !Number.isNaN(value);

      case 'boolean':
        return typeof value === 'boolean';

      case 'array':
        if (!Array.isArray(value)) {
          return false;
        }

        return value.every((item) => this.validate(type.child!, item));

      case 'object': {
        if (
          value == null ||
          typeof value !== 'object' ||
          Array.isArray(value)
        ) {
          return false;
        }

        const validator = new type.validator!();
        return validator.isValid(value);
      }

      default:
        return false;
    }
  }
}
