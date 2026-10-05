import { ResponseCodes } from './enums/ResponseCodes';
import { makeResponse } from './utils/makeResponse';

export const Responses = {
  OK: makeResponse(ResponseCodes.OK, 'Operación exitosa'),
  BAD_REQUEST: makeResponse(
    ResponseCodes.BAD_REQUEST,
    'No se pudo procesar correctamente la solicitud',
  ),
  UNAUTHORIZED: makeResponse(
    ResponseCodes.UNAUTHORIZED,
    'No posee los permisos necesarios para acceder al recurso',
  ),
  NOT_FOUND: makeResponse(ResponseCodes.NOT_FOUND, 'Recurso no encontrado'),
  INTERNAL_ERROR: makeResponse(
    ResponseCodes.INTERNAL_ERROR,
    'Ocurrio un error al procesar la solicitud',
  ),
};
