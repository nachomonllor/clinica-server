module.exports = {
  COMMON_ERROR: {
    error: true,
    message: 'Error.',
  },
  EMAIL_SEND_FAIL: {
    error: true,
    message: 'Error al enviar email',
  },
  DELETE_IMAGE_ERROR: {
    ok: false,
    error: true,
    message: 'Error al eliminar la imagen.',
  },
  RECORD_NOT_FOUND_ERROR: {
    ok: false,
    error: true,
    err: 'El registro no existe.',
  },
  RECORD_IN_USE_ERROR: {
    error: true,
    message: 'El registro no puede ser eliminado por que ya está en uso.',
  },
  RECORD_UPDATED_SUCCESS: {
    ok: true,
    message: 'El registro ha sido actualizado.'
  },
  DELETE_IMAGE_SUCCESS: {
    ok: true,
    msg: 'La foto ha sido eliminada.',
  },
  DB_CONNECTION_ERROR: {
    error: true,
    message: 'Problemas al intentar conectarse a la base de datos.',
  },
  UPDATE_RECORD_ERROR: {
    ok: false,
    error: true,
    message: 'Error al actualizar el registro.',
  },
  DELETE_RECORD_ERROR: {
    ok: false,
    error: true,
    message: 'Error al eliminar el registro.',
  },
  UPLOAD_IMAGE_SUCCESS: {
    ok: true,
    msg: 'La foto ha sido guardada.',
  },
  DELETE_SUCCESS: {
    ok: true,
    message: 'El registro ha sido eliminado.'
  }
};
