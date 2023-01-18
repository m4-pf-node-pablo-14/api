import * as yup from 'yup';
import { StringSchema } from 'yup';

const idSerializer: StringSchema = yup.string().uuid();

export { idSerializer };
