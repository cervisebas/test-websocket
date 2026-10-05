import { BaseValidator } from '@modules/shared/validators/BaseValidator';
import { AType } from '@modules/shared/validators/classes/AType';

export class TestValidator extends BaseValidator {
  public test = AType.STRING();
}
