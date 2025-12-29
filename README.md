# 🏡 El Umbral - Sistema de Reservas (Frontend)

> Plataforma web para gestionar reservas del quincho "El Umbral del Quincho" con experiencias personalizadas, reseñas de clientes y panel de administración.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://silver-croissant-fb9e1d.netlify.app)

## 🌐 Demo en Vivo

- **Sitio Web:** https://silver-croissant-fb9e1d.netlify.app
- **Panel Admin:** https://silver-croissant-fb9e1d.netlify.app/admin-login.html

## 📋 Características

### Para Clientes:
- ✅ **Reservas en línea** con selección de fecha, hora y experiencia
- 🎯 **3 tipos de experiencias:** Estándar, Personalizada y Promoción
- 💰 **Cálculo dinámico de precios** según día de semana y horario
- ⭐ **Sistema de reseñas** con envío por WhatsApp
- 📱 **Diseño responsive** para móviles y tablets
- 🌙 **Tema oscuro elegante** con animaciones suaves

### Para Administradores:
- 📊 **Dashboard completo** con estadísticas en tiempo real
- 🔍 **Filtros y búsqueda** de reservas por estado, fecha y cliente
- 📝 **Gestión de estados** (Preconfirmada → Confirmada → Finalizada)
- 💬 **Gestión de reseñas** (aprobar/rechazar/eliminar)
- 📱 **Links de reseñas por WhatsApp** automáticos
- 🔐 **Autenticación JWT** con roles de usuario

## 🛠️ Tecnologías

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Spring Boot (Java) - [Ver repositorio](https://github.com/nicolas-silva20/quincho-reservas-backend)
- **Base de Datos:** MySQL en Railway
- **Deployment:** 
  - Frontend: Netlify
  - Backend: Railway
- **Autenticación:** JWT (JSON Web Tokens)
- **API REST:** Comunicación asíncrona con fetch()

## 📂 Estructura del Proyecto

```
quincho-reservas-frontend/
├── index.html                 # Página principal
├── admin-login.html          # Login de administradores
├── admin-dashboard.html      # Dashboard de admin
├── dejar-resena.html         # Formulario de reseñas
├── terminos-condiciones.html # Términos y condiciones
├── politica-privacidad.html  # Política de privacidad
├── codigo-conducta.html      # Código de conducta
│
├── assets/                   # Recursos estáticos
│   └── images/               # Imágenes del sitio
│
├── components/               # Componentes reutilizables
│   ├── footer/               # Footer del sitio
│   ├── language-selector/    # Selector de idioma (futuro)
│   ├── navbar/               # Barra de navegación
│   └── notifications/        # Sistema de notificaciones
│
├── scripts/                  # Lógica JavaScript
│   ├── api.js                # Cliente API REST
│   ├── auth.js               # Autenticación y manejo de tokens
│   └── main.js               # Inicialización global
│
├── sections/                 # Secciones de la página
│   ├── admin/                # Secciones de administración
│   │   ├── dashboard/        # Dashboard principal
│   │   └── login/            # Login de admin
│   ├── landing/              # Sección hero/landing
│   ├── que-ofrecemos/        # Sección "Qué ofrecemos"
│   ├── reseñas/              # Sección de reseñas
│   ├── reservar/             # Formulario inicial de reserva
│   └── seleccionar-experiencia/ # Selector de experiencias
│
└── styles/                   # Estilos globales
    ├── global.css            # Variables CSS y estilos base
    └── responsive.css        # Media queries generales
```

## 🚀 Instalación Local

### Prerrequisitos

- Navegador web moderno (Chrome, Firefox, Edge)
- Live Server (extensión de VS Code) o servidor HTTP local

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/nicolas-silva20/quincho-reservas-frontend.git
   cd quincho-reservas-frontend
   ```

2. **Abrir con Live Server**
   - Opción 1: Clic derecho en `index.html` → "Open with Live Server"
   - Opción 2: Usar cualquier servidor HTTP local en el puerto 5500

3. **Configurar el backend (opcional para desarrollo)**
   - Por defecto, el frontend se conecta al backend en producción (Railway)
   - Para desarrollo local, editar `scripts/api.js`:
     ```javascript
     const API_BASE_URL = 'http://localhost:8080/api';
     ```

## ⚙️ Configuración

### Variables de Entorno (Netlify)

El proyecto se despliega automáticamente en Netlify desde la rama `main`. No requiere variables de entorno en el frontend.

### URLs de API

El archivo `scripts/api.js` detecta automáticamente el entorno:

```javascript
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080/api'  // Desarrollo local
    : 'https://quincho-reservas-backend-production.up.railway.app/api';  // Producción
```

## 📱 Responsive Design

El sitio está optimizado para:

- 📱 **Móviles:** 320px - 480px
- 📱 **Tablets:** 481px - 768px
- 💻 **Desktop:** 769px+

### Breakpoints Principales

```css
@media (max-width: 480px) { /* Móviles pequeños */ }
@media (max-width: 768px) { /* Tablets */ }
@media (max-width: 1024px) { /* Tablets grandes */ }
```

## 🎨 Guía de Estilos

### Colores

```css
--color-primary: #d4a574;    /* Dorado elegante */
--color-secondary: #8b7355;  /* Marrón cálido */
--color-dark: #000000;       /* Negro profundo */
--color-light: #ffffff;      /* Blanco puro */
```

### Tipografías

```css
--font-primary: 'Cinzel', serif;       /* Títulos */
--font-secondary: 'Montserrat', sans-serif;  /* Cuerpo */
```

## 🔒 Autenticación

### Login de Administradores

**Usuarios de prueba:**
- **Usuario:** Nicolas Silva | **Contraseña:** Argentina132
- **Usuario:** Juan Silva | **Contraseña:** 231279

El sistema usa JWT almacenado en `sessionStorage` con expiración de 24 horas.

## 📖 Documentación Adicional

- 📄 **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía de despliegue y configuración
- 📖 **[GUIA_CLIENTE.md](GUIA_CLIENTE.md)** - Manual de usuario del sistema

## 🔗 API Endpoints

El frontend consume estos endpoints del backend:

### Reservas
- `GET /api/reservas/admin/todas` - Obtener todas las reservas
- `GET /api/reservas/{id}` - Obtener reserva por ID
- `POST /api/reservas` - Crear nueva reserva
- `PUT /api/reservas/{id}/estado` - Cambiar estado de reserva
- `PUT /api/reservas/{id}/finalizar` - Finalizar reserva y generar token de reseña
- `DELETE /api/reservas/{id}` - Cancelar reserva

### Reseñas
- `GET /api/resenas/destacadas` - Obtener reseñas aprobadas (landing)
- `GET /api/resenas/admin/todas` - Obtener todas las reseñas (admin)
- `POST /api/resenas/crear` - Crear reseña desde token
- `PUT /api/resenas/{id}/aprobar` - Aprobar reseña
- `PUT /api/resenas/{id}/rechazar` - Rechazar reseña
- `DELETE /api/resenas/{id}` - Eliminar reseña

### Autenticación
- `POST /api/auth/login` - Login de administradores

### Experiencias
- `GET /api/experiencias` - Obtener todas las experiencias
- `GET /api/experiencias/{id}` - Obtener experiencia por ID
- `GET /api/experiencias/{id}/items` - Obtener items de una experiencia

### Disponibilidad
- `GET /api/disponibilidad?fecha=YYYY-MM-DD&hora=HH:mm` - Verificar disponibilidad

## 🤝 Contribuir

Este es un proyecto privado desarrollado para El Umbral del Quincho.

## 📝 Licencia

Proyecto privado © 2025 El Umbral del Quincho

## 👥 Desarrolladores

**Nicolas Silva & Juan Silva**

- GitHub: [@nicolas-silva20](https://github.com/nicolas-silva20)
- Proyecto: Sistema de Reservas para Quincho

---

## 📧 Contacto

Para consultas sobre el sistema:

🌐 **Sitio Web:** https://silver-croissant-fb9e1d.netlify.app  
👨‍💼 **Admin Panel:** https://silver-croissant-fb9e1d.netlify.app/admin-login.html
