import * as yup from 'yup';
import { SchemaOf } from 'yup';
import {
  IMessageRequest,
  IMessageResponse,
  IMessageUpdateRequest,
} from '../interfaces/examples.interfaces';

const messageSerializer: SchemaOf<IMessageRequest> = yup.object().shape({
  message: yup.string().required(),
});

const messageUpdateSerializer: SchemaOf<IMessageUpdateRequest> = yup
  .object()
  .shape({
    message: yup.string(),
  });

const messageResponserSerializer: SchemaOf<IMessageResponse> = yup
  .object()
  .shape({
    id: yup.string().uuid(),
    message: yup.string(),
  });

const listMessageSerializer: yup.ArraySchema<SchemaOf<IMessageResponse>> =
  yup.array(messageResponserSerializer);

export {
  messageSerializer,
  messageUpdateSerializer,
  messageResponserSerializer,
  listMessageSerializer,
};
