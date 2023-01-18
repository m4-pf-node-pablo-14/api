import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { IInterestRequets } from '../interfaces/interests.interfaces';

const interestRequestSerializer: SchemaOf<IInterestRequets> = yup
  .object()
  .shape({
    name: yup.string().required(),
  });

export { interestRequestSerializer };
