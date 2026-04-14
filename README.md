# MediSync - Sistema de Gestión de Citas Médicas

Sistema completo full-stack para la gestión de citas médicas. Incluye frontend React moderno y backend Spring Boot con arquitectura hexagonal.

## 📋 Descripción General

MediSync es una aplicación profesional para:
- **Pacientes**: Agendar, ver, editar y cancelar citas
- **Médicos**: Gestionar disponibilidad
- **Administración**: Vista general del sistema

## 🗂️ Estructura del Proyecto

```
medisync-frontend/              # Este repositorio
├── src/
│   ├── components/            # Componentes reutilizables
│   ├── pages/                 # Vistas de página
│   ├── services/              # Servicios de API
│   ├── types/                 # Tipos TypeScript
│   ├── utils/                 # Utilidades
│   ├── App.tsx               # Configuración de rutas
│   └── main.tsx              # Punto de entrada
├── package.json
├── tsconfig.json
├── vite.config.ts
├── FRONTEND_GUIDE.md         # Guía detallada del frontend
└── README.md                 # Este archivo
```

Backend (repositorio separado):
- Spring Boot 4.0.5
- Arquitectura Hexagonal
- Base de datos H2 en memoria
- Ejecuta en http://localhost:8080

## 🚀 Quickstart

### 1. Configurar el Backend

```bash
# Clonar o navegar al repositorio del backend
cd medisync-backend

# Compilar
./gradlew build

# Ejecutar
./gradlew bootRun
```

El backend estará disponible en `http://localhost:8080`

### 2. Configurar el Frontend

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 📱 Uso de la Aplicación

### Pantalla Principal - Listado de Citas
- Ver todas las citas del usuario
- Filtrar por estado (Programada, Completada, Cancelada)
- Acciones rápidas: Ver, Editar, Cancelar

### Crear Nueva Cita
1. Hacer clic en "+ Nueva Cita"
2. Seleccionar paciente
3. Seleccionar médico
4. Elegir fecha y hora (futura obligatoria)
5. Hacer clic en "Agendar Cita"

### Editar Cita
- Solo citas con estado "SCHEDULED" pueden editarse
- Datos pre-rellenados automáticamente
- Cambiar cualquier campo y actualizar

### Ver Detalles
- Información completa del paciente
- Información del médico (nombre y especialidad)
- Fecha, hora y estado
- Opción para editar si es posible

## 🎨 Diseño y Estilo

### Paleta de Colores Profesional
- **Primario**: Azul (#1e3a8a) - Botones de acción principal
- **Secundario**: Azul oscuro (#0c4a6e) - Encabezados
- **Acento**: Cian (#06b6d4) - Acciones secundarias
- **Estados**: 
  - Verde (#10b981) - Éxito/Completada
  - Rojo (#ef4444) - Peligro/Cancelada
  - Naranja (#f59e0b) - Advertencia

### Tipografía
- Fuente del sistema (San-serif)
- Jerarquía clara de tamaños
- Contraste accesible

### Responsive Design
- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (< 768px)

## 🔗 Integración Frontend-Backend

### Comunicación API

El frontend se comunica con el backend mediante Axios:

```typescript
// Crear cita
POST /appointments
{
  "patientId": 1,
  "doctorId": 2,
  "dateTime": "2024-12-25T14:30:00"
}

// Obtener citas
GET /appointments

// Ver detalles
GET /appointments/:id

// Editar cita
PUT /appointments/:id

// Cancelar cita
DELETE /appointments/:id
```

### Datos Disponibles en el Backend

**5 Pacientes de prueba:**
- Juan García, María López, Carlos Rodríguez, Ana Martínez, Pedro Sánchez

**5 Médicos de prueba:**
- Dr. Luis Pérez (Cardiología)
- Dra. Sofia Gómez (Dermatología)
- Dr. Miguel Torres (Cirugía General)
- Dra. Patricia Díaz (Oftalmología)
- Dr. Roberto Flores (Neurología)

## 📦 Dependencias Principales Frontend

```json
{
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.14.1",
    "axios": "^1.15.0"
  },
  "devDependencies": {
    "typescript": "~6.0.2",
    "vite": "^8.0.4",
    "@vitejs/plugin-react": "^6.0.1"
  }
}
```

## 🛠️ Comandos Disponibles

### Frontend

```bash
# Instalar dependencias
npm install

# Desarrollo con HMR
npm run dev

# Build para producción
npm run build

# Lint de código
npm run lint

# Preview del build
npm run preview
```
