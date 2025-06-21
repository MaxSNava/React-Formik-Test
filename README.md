# React Formik Test

Este proyecto es un ejemplo sencillo de una aplicación **Full Stack TypeScript**. Incluye un backend en Express y una interfaz en React que utiliza Formik para el manejo de formularios.

## Contenido del repositorio

- **frontend/**: aplicación creada con Vite y React. Utiliza Tailwind CSS, Formik y RTK Query para consumir la API.
- **backend/**: servidor en Express que expone una API REST y persiste la información en una base de datos SQLite.

## Requisitos

- Node.js 18 o superior
- npm

## Puesta en marcha

### 1. Backend

```bash
cd backend
npm install
npm run backend
```

El servidor quedará escuchando en `http://localhost:3000/api` y creará el archivo `data.db` donde se almacena la base de datos.

### 2. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`.

## Endpoints principales

- `GET /api/items` – Listar los items disponibles (acepta paginación con `page` y `limit`).
- `POST /api/items` – Crear un nuevo item.
- `PATCH /api/items/:id` – Actualizar un item existente.
- `DELETE /api/items/:id` – Eliminar un item.

## Estado del proyecto

El formulario de creación se encuentra implementado en `ItemForm.tsx`. La lista y la actualización de items están en desarrollo.

¡Esperamos que te sirva como base para tus propias pruebas con React y Formik!
