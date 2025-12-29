# Despliegue de El Umbral - Quincho Reservas

## 📋 Resumen

Este proyecto se despliega en dos plataformas gratuitas:
- **Frontend**: Netlify (HTML/CSS/JS est\u00e1tico)
- **Backend + MySQL**: Railway (Spring Boot + Base de datos)

---

## 🚀 PASO 1: Preparar Repositorio en GitHub

### 1.1 Crear repositorios

Necesitas **DOS repositorios separados**:

```bash
# Repositorio 1: Frontend
quincho-reservas-frontend

# Repositorio 2: Backend
quincho-reservas-backend
```

### 1.2 Subir Frontend a GitHub

```bash
cd D:\Quincho\quincho-reservas-frontend\quincho-reservas-frontend

# Inicializar git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit - Frontend El Umbral"

# Conectar con tu repositorio de GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/quincho-reservas-frontend.git

# Subir a GitHub
git push -u origin main
```

### 1.3 Subir Backend a GitHub

```bash
cd D:\Quincho\quincho-reservas

# Inicializar git
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit - Backend El Umbral"

# Conectar con tu repositorio de GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/quincho-reservas-backend.git

# Subir a GitHub
git push -u origin main
```

---

## 🔧 PASO 2: Desplegar Backend en Railway

### 2.1 Crear cuenta en Railway

1. Ve a [railway.app](https://railway.app)
2. Haz clic en "Start a New Project"
3. Inicia sesi\u00f3n con tu cuenta de GitHub

### 2.2 Crear Base de Datos MySQL

1. En Railway, haz clic en **"+ New"** → **"Database"** → **"Add MySQL"**
2. Railway crear\u00e1 autom\u00e1ticamente la base de datos
3. Anota las credenciales que aparecen en la pesta\u00f1a "Variables"

### 2.3 Desplegar Backend

1. Haz clic en **"+ New"** → **"GitHub Repo"**
2. Selecciona tu repositorio `quincho-reservas-backend`
3. Railway detectar\u00e1 autom\u00e1ticamente que es un proyecto Maven/Spring Boot

### 2.4 Configurar Variables de Entorno

En el panel de tu proyecto backend, ve a **"Variables"** y agrega:

```
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=jdbc:mysql://[HOST]:[PORT]/railway
DATABASE_USERNAME=[usuario de MySQL Railway]
DATABASE_PASSWORD=[contrase\u00f1a de MySQL Railway]
JWT_SECRET=tu-secreto-super-seguro-min-256-bits-cambialo-por-algo-aleatorio
CORS_ORIGINS=https://tu-app.netlify.app
```

**Importante**: Railway te proporciona autom\u00e1ticamente `DATABASE_URL`, `MYSQLUSER`, `MYSQLPASSWORD`, etc. \u00dasalas si est\u00e1n disponibles.

### 2.5 Crear Tablas en MySQL Railway

1. En Railway, haz clic en tu base de datos MySQL
2. Ve a la pesta\u00f1a **"Data"** o **"Query"**
3. Ejecuta este SQL:

```sql
-- Crear tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'ADMIN',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar tus usuarios (con los hashes BCrypt que generamos)
INSERT INTO usuarios (username, password, rol) VALUES 
('Nicolas Silva', '$2b$10$KShhrzDJvNKLx8JLQIoRQ.7H8ew9BWqe/3GpJsMxbVVQKVyEEaXJi', 'ADMIN'),
('Juan Silva', '$2b$10$sa5gHaZAcdsbKz.VsCXmfu2Oyyp3bFcmKgX6JHUVncCYN9DCA7LmS', 'ADMIN');
```

### 2.6 Obtener URL del Backend

1. En Railway, haz clic en tu servicio backend
2. Ve a **"Settings"** → **"Generate Domain"**
3. Railway te dar\u00e1 una URL como: `https://tu-proyecto.up.railway.app`
4. **Anota esta URL**, la necesitar\u00e1s para el frontend

---

## 🌐 PASO 3: Desplegar Frontend en Netlify

### 3.1 Crear cuenta en Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Haz clic en "Sign up" e inicia sesi\u00f3n con GitHub

### 3.2 Actualizar URL del Backend

**IMPORTANTE**: Antes de desplegar, actualiza la URL del backend en tu frontend.

En el archivo `scripts/api.js`, l\u00ednea 6-8, reemplaza:

```javascript
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080/api'
    : 'https://TU-URL-DE-RAILWAY.up.railway.app/api'; // ← Cambiar aqu\u00ed
```

Luego haz commit y push:

```bash
cd D:\Quincho\quincho-reservas-frontend\quincho-reservas-frontend
git add scripts/api.js
git commit -m "Update backend URL for production"
git push
```

### 3.3 Desplegar en Netlify

1. En Netlify, haz clic en **"Add new site"** → **"Import an existing project"**
2. Selecciona **"Deploy with GitHub"**
3. Busca y selecciona tu repositorio `quincho-reservas-frontend`
4. Configuraci\u00f3n de build:
   - **Build command**: (dejar vac\u00edo, es un sitio est\u00e1tico)
   - **Publish directory**: `/` (ra\u00edz del proyecto)
5. Haz clic en **"Deploy site"**

### 3.4 Configurar Dominio Personalizado (Opcional)

1. En Netlify, ve a **"Site settings"** → **"Domain management"**
2. Puedes usar el dominio gratuito `tu-nombre.netlify.app`
3. O conectar un dominio personalizado si tienes uno

### 3.5 Actualizar CORS en Railway

**IMPORTANTE**: Actualiza la variable de entorno `CORS_ORIGINS` en Railway con tu URL de Netlify:

```
CORS_ORIGINS=https://tu-app.netlify.app
```

---

## ✅ PASO 4: Verificar Deployment

### 4.1 Probar Backend

Abre en tu navegador:
```
https://tu-backend.up.railway.app/api/experiencias
```

Deber\u00edas ver un JSON con las experiencias.

### 4.2 Probar Frontend

1. Abre tu sitio de Netlify: `https://tu-app.netlify.app`
2. Navega por el sitio
3. Intenta hacer una reserva
4. Prueba el login de administrador:
   - Usuario: `Nicolas Silva`
   - Contrase\u00f1a: `Argentina132`

---

## 🔄 C\u00f3mo Hacer Cambios Despu\u00e9s del Deploy

### Para el Frontend:

```bash
cd D:\Quincho\quincho-reservas-frontend\quincho-reservas-frontend

# Hacer tus cambios en el c\u00f3digo...

git add .
git commit -m "Descripci\u00f3n de tus cambios"
git push

# Netlify desplegar\u00e1 autom\u00e1ticamente en ~30 segundos
```

### Para el Backend:

```bash
cd D:\Quincho\quincho-reservas

# Hacer tus cambios en el c\u00f3digo...

git add .
git commit -m "Descripci\u00f3n de tus cambios"
git push

# Railway desplegar\u00e1 autom\u00e1ticamente en ~2-3 minutos
```

---

## 📊 L\u00edmites de las Versiones Gratuitas

### Netlify (Frontend):
- ✅ 100 GB de ancho de banda/mes
- ✅ 300 minutos de build/mes
- ✅ Deploys ilimitados
- ✅ HTTPS gratis

### Railway (Backend + MySQL):
- ✅ $5 USD de cr\u00e9dito mensual gratuito
- ✅ Suficiente para ~500 horas/mes de uptime
- ⚠️  Se apaga despu\u00e9s de inactividad (se reactiva autom\u00e1ticamente)
- ✅ 1 GB de almacenamiento MySQL

---

## 🆘 Soluci\u00f3n de Problemas

### Error CORS:
- Verifica que `CORS_ORIGINS` en Railway incluya tu URL de Netlify
- Aseg\u00farate de que la URL no tenga `/` al final

### Backend no responde:
- Railway puede tardar hasta 3 minutos en el primer despliegue
- Revisa los logs en Railway → "Deployments" → "View logs"

### Login no funciona:
- Verifica que hayas ejecutado el SQL para crear los usuarios
- Aseg\u00farate de que `JWT_SECRET` est\u00e9 configurado en Railway

### Frontend no conecta con Backend:
- Verifica que la URL en `api.js` sea correcta
- Abre la consola del navegador (F12) para ver errores

---

## 📝 Notas Importantes

1. **Seguridad**: Nunca subas a GitHub:
   - Contrase\u00f1as de base de datos
   - JWT secrets
   - Archivos `application-local.properties`

2. **Backup**: Railway hace backups autom\u00e1ticos, pero es buena idea exportar tu base de datos peri\u00f3dicamente

3. **Monitoreo**: Revisa los logs de Railway regularmente para detectar errores

---

## 🎉 \u00a1Listo!

Tu aplicaci\u00f3n ahora est\u00e1 en l\u00ednea y accesible desde cualquier lugar. Puedes seguir haciendo cambios localmente y desplegar autom\u00e1ticamente con `git push`.
