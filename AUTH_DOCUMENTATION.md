# Sistema de Autenticación - Frontend

## 🚀 Características Implementadas

### ✅ Funcionalidades Completas
- **Registro de usuarios** con validación
- **Login/Logout** con JWT
- **Actualización de perfil** (nombre y contraseña)
- **Eliminación de cuenta** con confirmación
- **Persistencia de sesión** en localStorage
- **Protección de rutas** con middleware
- **Redirecciones inteligentes** después del login

### 🔐 Seguridad
- **Contraseñas hasheadas** con bcrypt
- **JWT tokens** con expiración de 7 días
- **Validación de formularios** en frontend y backend
- **Middleware de protección** de rutas
- **Manejo seguro de tokens** en localStorage

## 📁 Estructura de Archivos

```
frontend/
├── components/
│   ├── auth/
│   │   ├── auth-form.tsx          # Formulario de login/registro
│   │   └── profile-form.tsx       # Formulario de perfil
│   └── ui/
│       ├── tabs.tsx               # Componente Tabs
│       └── alert-dialog.tsx       # Diálogo de confirmación
├── hooks/
│   └── use-auth.tsx               # Hook de autenticación con Zustand
├── types/
│   └── user.ts                    # Tipos TypeScript para usuario
├── app/(routes)/
│   ├── auth/
│   │   └── page.tsx               # Página de autenticación
│   └── profile/
│       └── page.tsx               # Página de perfil
└── middleware.ts                  # Middleware de protección
```

## 🛠️ Configuración

### Variables de Entorno
```env
# Frontend (.env.local)
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Backend (.env)
JWT_SECRET=tu-secreto-super-seguro
MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos
```

### Instalación de Dependencias
```bash
# Frontend
npm install @radix-ui/react-tabs @radix-ui/react-alert-dialog

# Backend
npm install bcryptjs jsonwebtoken express-validator
```

## 🎯 Uso del Sistema

### 1. Hook de Autenticación
```typescript
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    login, 
    register, 
    logout,
    updateProfile,
    deleteAccount 
  } = useAuth();

  // Verificar si está autenticado
  if (isAuthenticated) {
    console.log('Usuario:', user?.name);
  }
}
```

### 2. Protección de Rutas
```typescript
// middleware.ts protege automáticamente:
// - /profile
// - /checkout

// Redirige a /auth si no está autenticado
// Redirige a / si ya está autenticado y va a /auth
```

### 3. Componentes de UI
```typescript
// Formulario de autenticación
<AuthForm onSuccess={() => router.push('/dashboard')} />

// Formulario de perfil
<ProfileForm />
```

## 🔄 Flujo de Autenticación

### Registro
1. Usuario llena formulario en `/auth`
2. Se valida en frontend y backend
3. Contraseña se hashea con bcrypt
4. Se crea usuario en MongoDB
5. Se genera JWT token
6. Se almacena en localStorage
7. Se redirige a página solicitada o home

### Login
1. Usuario ingresa credenciales
2. Se valida email/contraseña
3. Se compara contraseña hasheada
4. Se genera nuevo JWT token
5. Se actualiza localStorage
6. Se redirige automáticamente

### Logout
1. Se limpia localStorage
2. Se redirige a home
3. Se muestra toast de confirmación

## 🛡️ Rutas Protegidas

### Automáticamente Protegidas
- `/profile` - Perfil del usuario
- `/checkout` - Proceso de pago

### Comportamiento
- **Sin autenticación**: Redirige a `/auth?redirect=/ruta-original`
- **Con autenticación**: Acceso normal
- **Rutas de auth**: Redirige a `/` si ya está autenticado

## 🎨 Componentes UI

### AuthForm
- **Tabs** para alternar entre login/registro
- **Validación** en tiempo real
- **Loading states** durante operaciones
- **Manejo de errores** con toast
- **Redirección automática** después del éxito

### ProfileForm
- **Edición de nombre** y contraseña
- **Email de solo lectura**
- **Confirmación** para eliminar cuenta
- **Validaciones** de seguridad

### Navbar Integration
- **Dropdown** para usuario autenticado
- **Botón de login** para usuarios no autenticados
- **Información del usuario** visible
- **Acceso rápido** a perfil y logout

## 🔧 Personalización

### Cambiar Rutas Protegidas
```typescript
// middleware.ts
const protectedRoutes = ['/profile', '/checkout', '/admin']
```

### Modificar Expiración de Token
```typescript
// lib/auth.js (backend)
export const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
};
```

### Agregar Campos al Perfil
```typescript
// types/user.ts
export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string; // Nuevo campo
  address?: string; // Nuevo campo
  createdAt: string;
};
```

## 🚨 Manejo de Errores

### Errores Comunes
- **Credenciales inválidas**: Toast de error
- **Email duplicado**: Validación en registro
- **Token expirado**: Redirección automática a login
- **Red de red**: Mensajes de error descriptivos

### Validaciones
- **Email**: Formato válido
- **Contraseña**: Mínimo 6 caracteres
- **Nombre**: Mínimo 2 caracteres
- **Confirmación**: Contraseñas coinciden

## 📱 Responsive Design

Todos los componentes están optimizados para:
- **Desktop**: Layout completo con tabs
- **Tablet**: Adaptación automática
- **Mobile**: Formularios apilados verticalmente

## 🔄 Integración con Carrito

El sistema se integra perfectamente con:
- **Carrito existente**: Se mantiene al hacer login
- **Productos favoritos**: Persisten en la sesión
- **Checkout**: Requiere autenticación automáticamente

## 🎯 Próximos Pasos Sugeridos

1. **Verificación de email** para nuevos registros
2. **Recuperación de contraseña** por email
3. **Autenticación social** (Google, Facebook)
4. **Roles y permisos** avanzados
5. **Historial de pedidos** en perfil
6. **Notificaciones push** para usuarios 