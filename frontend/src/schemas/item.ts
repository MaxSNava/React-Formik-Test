import * as yup from 'yup';

// const configRegex = /^[a-zA-Z0-9ñÑ\s]$/;

export const itemSchema = yup.object().shape({
  name: yup.string().
    required('Nombre del item es requerido').
    min(3, 'Nombre del item debe tener al menos 3 caracteres').
    max(50, 'Nombre del item debe tener como máximo 50 caracteres'),
    //matches(configRegex, 'Solo puede contener letras, números y espacios'),

  description: yup.string().
    required('Descripción del item es requerida').
    min(10, 'Descripción del item debe tener al menos 10 caracteres').
    max(100, 'Descripción del item debe tener como máximo 100 caracteres'),
    //matches(configRegex, 'Solo puede contener letras, números y espacios'),
});
