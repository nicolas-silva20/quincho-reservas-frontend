# 📖 Guía de Usuario - El Umbral del Quincho

Sistema de gestión de reservas para quincho con experiencias personalizadas.

---

## 🌐 Acceso al Sistema

### Para Clientes:
**Sitio Web:** https://quinchoelumbral.netlify.app

Desde aquí podés:
- Ver las experiencias disponibles
- Hacer reservas online
- Dejar reseñas después de tu visita

### Para Administradores:
**Panel Admin:** https://quinchoelumbral.netlify.app/admin-login.html

**Acceso restringido:**
Solicita las credenciales de acceso a los administradores del sistema. Por razones de seguridad, las credenciales son confidenciales y solo están disponibles para personal autorizado.

---

## 💰 Experiencias Disponibles

### 1. Experiencia Estándar
- Uso del quincho completo
- Parrilla y utensilios básicos
- Capacidad: 20 personas
- Precio variable según día y horario

### 2. Experiencia Personalizada
- Todo lo de la estándar
- Extras opcionales: Pileta, Inflables, Música, Decoración
- Ideal para eventos especiales

### 3. Experiencia Promoción
- Paquete con descuento
- Incluye extras seleccionados
- Capacidad: 20 personas

---

## 📝 Cómo Hacer una Reserva

1. Ingresá a la web
2. Click en "RESERVAR AHORA"
3. Ingresá tu nombre
4. Seleccioná la experiencia que prefieras
5. Elegí fecha y hora disponible
6. Completá tus datos de contacto
7. Aceptá los términos y condiciones
8. Confirmá tu reserva

**Importante:** Recibirás confirmación por WhatsApp o llamada telefónica.

---

## ⭐ Sistema de Reseñas

Después de tu visita, recibirás un link por WhatsApp para dejar tu reseña:

1. Abrí el link recibido
2. Seleccioná las estrellas (1-5)
3. Escribí tu comentario
4. Enviá la reseña

Tu reseña será revisada y publicada en el sitio web.

---

## 🔧 Panel de Administración

### Dashboard Principal
- Ver todas las reservas
- Filtrar por estado, fecha o cliente
- Estadísticas en tiempo real
- Buscar reservas específicas

### Gestión de Reservas
Estados disponibles:
- **Preconfirmada:** Recién creada, pendiente de contacto
- **Confirmada:** Cliente contactado y confirmado
- **Pagada Completa:** Pago recibido
- **Finalizada:** Evento realizado
- **Cancelada:** Por cliente o administrador

### Acciones Disponibles
- **Ver:** Detalles completos de la reserva
- **Cambiar Estado:** Actualizar estado de la reserva
- **Generar Link de Reseña:** Crear link único para el cliente
- **Cancelar:** Cancelar la reserva

### Gestión de Reseñas
- Ver todas las reseñas recibidas
- Aprobar reseñas (se muestran en la web)
- Rechazar reseñas (no se publican)
- Eliminar reseñas permanentemente

---

## 📱 Uso en Móvil

El panel de administración está optimizado para teléfonos:
- Reservas se muestran como tarjetas fáciles de leer
- Botones grandes para tocar
- Modales que ocupan toda la pantalla
- Diseño vertical adaptado para uso con una mano

**Recomendado para:** Gestión rápida desde cualquier lugar

---

## 💡 Preguntas Frecuentes

### ¿Cómo cambio el estado de una reserva?
1. Ingresá al dashboard
2. Buscá la reserva
3. Click en "Estado"
4. Seleccioná el nuevo estado
5. Confirmá

### ¿Cómo envío el link de reseña al cliente?
1. Marcá la reserva como "Finalizada"
2. El sistema genera automáticamente el link
3. Click en "Enviar por WhatsApp"
4. Se abre WhatsApp con el mensaje pre-formateado
5. Enviá el mensaje al cliente

### ¿Puedo editar una reserva?
Por el momento, solo se puede cambiar el estado. Para modificar datos, cancelá y crea una nueva reserva.

### ¿Las reseñas se publican automáticamente?
No. Todas las reseñas pasan por aprobación del administrador antes de aparecer en la web.

---

## 🔒 Seguridad

- Autenticación con JWT (token seguro)
- Sesión válida por 24 horas
- Contraseñas encriptadas con BCrypt
- Conexión HTTPS en producción

---

## 📊 Precio y Depósitos

### Sistema de Precios:
- Varía según día de semana (lunes-domingo)
- Varía según horario (mañana/tarde/noche)
- Extras se cobran aparte

### Depósito en Garantía:
- $130.000 requeridos
- Devuelto después del evento si no hay daños
- Incluye limpieza básica

---

## 📞 Soporte Técnico

**Para problemas con el sistema:**
- Revisá primero que tu conexión a internet funcione
- Intentá cerrar sesión y volver a entrar
- Limpiá la caché del navegador (Ctrl+Shift+R)

**Si persiste el problema:**
- Contactá al desarrollador
- Enviá captura de pantalla del error
- Indicá qué estabas haciendo cuando ocurrió

---

## 🔄 Actualizaciones

El sistema se actualiza automáticamente cuando hay cambios en el código:
- Frontend: Netlify detecta cambios en GitHub y redespliega
- Backend: Railway detecta cambios y reinicia el servidor

**No necesitás hacer nada**, solo esperá 2-3 minutos después de un cambio.

---

## 📝 Términos Importantes

- **Experiencia:** Tipo de paquete seleccionado
- **Preconfirmada:** Estado inicial de toda reserva
- **Token de Reseña:** Link único e irrepetible para dejar reseña
- **Estado Pago:** Seguimiento del pago del cliente
- **Horario de Contacto:** Franja horaria para llamar al cliente

---

## 🎯 Tips de Uso

1. **Contactá rápido:** Cambiá a "Confirmada" apenas contactes al cliente
2. **Finalizá siempre:** Marcá como "Finalizada" para poder enviar reseña
3. **Revisá reseñas:** Aprobá solo reseñas apropiadas y reales
4. **Usa filtros:** Para encontrar reservas rápido
5. **Móvil siempre disponible:** Gestioná desde tu teléfono en cualquier momento

---

**Sistema desarrollado por Nicolas Silva & Juan Silva**  
**Versión:** 1.0 (Diciembre 2025)  
**Plataforma:** Netlify + Railway
