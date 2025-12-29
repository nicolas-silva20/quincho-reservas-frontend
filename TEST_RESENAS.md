# 🧪 GUÍA DE TESTING - SISTEMA DE RESEÑAS VÍA WHATSAPP

## 📋 Descripción del Sistema

El sistema funciona en 3 pasos:
1. **Admin finaliza reserva** → Backend genera token único
2. **Admin envía link por WhatsApp** → Mensaje pre-formateado con link
3. **Cliente abre link** → Deja reseña (validada por token)

---

## ✅ MÉTODOS DE TESTING SIN MOLESTAR A PERSONAS REALES

### **MÉTODO 1: Testing con tu propio WhatsApp** ⭐ (MÁS SIMPLE)

1. En el **Dashboard Admin**, finaliza una reserva de prueba
2. Click en **"📱 Enviar por WhatsApp"**
3. **IMPORTANTE:** En lugar de enviar, usa tu propio número de teléfono
   - WhatsApp Web se abrirá con el mensaje pre-formateado
   - Copia el link del mensaje
   - Pégalo en tu navegador
4. Completa la reseña como si fueras el cliente
5. Verifica en el admin que la reseña aparece pendiente de aprobación

**Ventajas:**
- No molestas a nadie
- Pruebas el flujo completo
- Ves cómo se ve el mensaje en WhatsApp

---

### **MÉTODO 2: Testing Manual del Link** 🔗 (SIN WHATSAPP)

1. En el **Dashboard Admin**, finaliza una reserva de prueba
2. Click en **"📋 Copiar Link"** (NO uses el botón de WhatsApp)
3. Pega el link directamente en tu navegador
4. Completa el formulario de reseña
5. Verifica en el admin

**Ventajas:**
- Más rápido
- No necesitas WhatsApp Web
- Ideal para testing repetitivo

---

### **MÉTODO 3: Consola del Navegador** 👨‍💻 (PARA DESARROLLADORES)

1. Abre el **Dashboard Admin** (F12 para DevTools)
2. En la consola, ejecuta:

```javascript
// Simular envío sin abrir WhatsApp
const testToken = 'token-de-prueba-123'; // Usa un token real del backend
const testLink = `https://silver-croissant-fb9e1d.netlify.app/dejar-resena.html?token=${testToken}`;
console.log('Link de test:', testLink);
```

3. Copia el link de la consola y ábrelo
4. Completa la reseña

**Ventajas:**
- Control total
- No necesitas reservas reales
- Puedes generar múltiples tests

---

## 🔧 PROBLEMA DETECTADO: Link usa localhost

**❌ PROBLEMA:**
```javascript
const link = `http://localhost:5500/dejar-resena.html?token=${token}`;
const mensaje = `...http://localhost:5500/dejar-resena.html?token=${token}...`;
```

**✅ SOLUCIÓN:**
Necesitas actualizar estos archivos para usar la URL de producción:

### Archivos a modificar:

1. **dashboard.js** - Línea 1125 (función `marcarComoFinalizada`)
2. **dashboard.js** - Línea 511 (función `mostrarLinkResena`)
3. **dashboard.js** - Línea 1185 (función `abrirWhatsApp`)

**Cambiar de:**
```javascript
http://localhost:5500/dejar-resena.html?token=${token}
```

**A:**
```javascript
https://silver-croissant-fb9e1d.netlify.app/dejar-resena.html?token=${token}
```

---

## 🚀 TESTING EN PRODUCCIÓN

### Paso 1: Crear Reserva de Prueba

1. Ve a tu sitio en producción
2. Crea una reserva con datos de prueba:
   - **Nombre:** TEST - No contactar
   - **Teléfono:** Tu propio número
   - **Email:** tu.email@test.com

### Paso 2: Finalizar en Admin

1. Inicia sesión en el admin
2. Busca la reserva TEST
3. Click en **"Marcar como Finalizada"**

### Paso 3: Testing del Link

**Opción A - Sin WhatsApp:**
- Click en "📋 Copiar Link"
- Pega en navegador
- Completa reseña

**Opción B - Con WhatsApp (tu número):**
- Click en "📱 Enviar por WhatsApp"
- Se abre WhatsApp Web con TU número
- Lee el mensaje (no lo envíes o envíalo a ti mismo)
- Copia el link del mensaje
- Pégalo en navegador

### Paso 4: Verificar Reseña

1. Completa el formulario de reseña
2. Envía
3. Verifica en Admin → "Ver Reseñas"
4. Aprueba o rechaza la reseña de prueba

---

## 🧪 CASOS DE PRUEBA RECOMENDADOS

### ✅ Caso 1: Flujo Completo Exitoso
- Crear reserva → Finalizar → Enviar link → Dejar reseña 5★ → Aprobar
- **Resultado esperado:** Reseña aparece en la landing page

### ✅ Caso 2: Token Inválido
- Usa un link con token inventado: `?token=abc123fake`
- **Resultado esperado:** Error "Token inválido. Por favor, usa el link que recibiste por WhatsApp."

### ✅ Caso 3: Token Ya Usado
- Usa el mismo link 2 veces
- **Resultado esperado:** Primer uso exitoso, segundo uso muestra error

### ✅ Caso 4: Reseña Rechazada
- Crear reseña → Rechazar en admin
- **Resultado esperado:** NO aparece en la landing page

### ✅ Caso 5: Validación de Formulario
- Intenta enviar sin seleccionar estrellas
- **Resultado esperado:** Error "Por favor, seleccioná una calificación (estrellas)"

---

## 📱 SIMULADOR DE WHATSAPP (OPCIONAL)

Si quieres ver exactamente cómo se verá el mensaje sin enviarlo:

1. Usa [wa.me](https://wa.me/) con tu número
2. Click en el botón de WhatsApp del admin
3. Se abrirá WhatsApp Web con el mensaje
4. **NO ENVÍES** - solo lee cómo se ve
5. Copia el link del mensaje

**Mensaje que verás:**
```
¡Hola [Nombre]! Gracias por visitarnos en El Umbral del Quincho. 🎉

Nos encantaría conocer tu experiencia. Por favor, dejanos tu reseña en el siguiente link:

https://silver-croissant-fb9e1d.netlify.app/dejar-resena.html?token=abc123...

¡Esperamos verte pronto! 🌟
```

---

## 🐛 DEBUGGING

### Si el link no funciona:

1. **Verificar el token en la base de datos:**
```sql
SELECT id, cliente_id, resena_token, token_expiracion 
FROM reservas 
WHERE estado = 'finalizada' 
ORDER BY id DESC 
LIMIT 5;
```

2. **Verificar en consola del navegador (F12):**
```javascript
// Ver errores al abrir dejar-resena.html
console.log('Token URL:', new URLSearchParams(window.location.search).get('token'));
```

3. **Verificar la API:**
```javascript
// En la consola de dejar-resena.html
const token = new URLSearchParams(window.location.search).get('token');
fetch(`https://quincho-reservas-backend-production.up.railway.app/api/resenas/crear`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, calificacion: 5, comentario: 'Test' })
})
.then(r => r.json())
.then(d => console.log('Respuesta:', d));
```

---

## ✨ RESUMEN RÁPIDO

**Para testear SIN molestar a nadie:**

1. **Más simple:** Usa tu propio WhatsApp (envíate el mensaje a ti mismo)
2. **Más rápido:** Copia el link y pégalo directo en el navegador
3. **Más técnico:** Genera tokens en consola y testa manualmente

**IMPORTANTE:** Antes de todo, actualiza los 3 lugares donde dice `localhost:5500` por la URL de Netlify.

---

¿Necesitas que hagamos esos cambios ahora? 🚀
