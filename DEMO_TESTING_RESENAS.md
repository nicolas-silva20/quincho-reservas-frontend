# 🎯 DEMO PRÁCTICA: Testing del Sistema de Reseñas

## ✅ TEST COMPLETO PASO A PASO (5 minutos)

### PASO 1: Crear Reserva de Prueba en Producción

1. Abre: https://silver-croissant-fb9e1d.netlify.app
2. Click en **"RESERVAR AHORA"**
3. Ingresa tu nombre: **"TEST RESEÑA"**
4. Selecciona cualquier experiencia
5. Elige fecha y hora disponible
6. Completa el formulario:
   - **Nombre:** TEST RESEÑA
   - **Teléfono:** +5491112345678 (tu número real o uno de prueba)
   - **Email:** test@test.com
7. Acepta términos y confirma

**Resultado:** Verás mensaje de confirmación con número de reserva

---

### PASO 2: Finalizar Reserva como Admin

1. Abre: https://silver-croissant-fb9e1d.netlify.app/admin-login.html
2. Inicia sesión:
   - **Usuario:** Nicolas Silva
   - **Contraseña:** Argentina132
3. Click en **"Ver Reservas"**
4. Busca la reserva **"TEST RESEÑA"**
5. Click en **"👁️ Ver"** (botón verde)
6. Click en **"Marcar como Finalizada"**
7. Confirma la acción

**Resultado:** Verás un modal con:
- ✅ Reserva Finalizada
- 🔗 Link de reseña
- 📋 Botón "Copiar Link"
- 📱 Botón "Enviar por WhatsApp"

---

### PASO 3A: Testing SIN WhatsApp (Más Rápido) ⚡

1. En el modal anterior, click en **"📋 Copiar Link"**
2. Abre una nueva pestaña del navegador
3. Pega el link (Ctrl+V o Cmd+V)
4. Presiona Enter

**Link será algo como:**
```
https://silver-croissant-fb9e1d.netlify.app/dejar-resena.html?token=abc123...
```

**Salta al PASO 4**

---

### PASO 3B: Testing CON WhatsApp (Más Realista) 📱

1. En el modal, click en **"📱 Enviar por WhatsApp"**
2. Se abrirá WhatsApp Web (o app) con mensaje pre-formateado
3. **OPCIÓN A:** Envíate el mensaje a ti mismo
   - Cambia el número en WhatsApp por el tuyo
   - Envía
   - Abre el mensaje en tu teléfono
   - Click en el link

4. **OPCIÓN B:** No envíes, solo copia el link
   - Lee el mensaje que se generó
   - Selecciona el link que aparece en el mensaje
   - Cópialo (Ctrl+C)
   - Pégalo en el navegador

**Mensaje que verás:**
```
¡Hola TEST RESEÑA! Gracias por visitarnos en El Umbral del Quincho. 🎉

Nos encantaría conocer tu experiencia. Por favor, dejanos tu reseña en el siguiente link:

https://silver-croissant-fb9e1d.netlify.app/dejar-resena.html?token=...

¡Esperamos verte pronto! 🌟
```

---

### PASO 4: Dejar Reseña (Como Cliente)

1. Deberías ver la página **"DEJÁ TU RESEÑA"**
2. Si ves error de token, vuelve al PASO 2 y genera un nuevo link
3. Completa el formulario:
   - **Calificación:** Click en las estrellas (1 a 5)
   - **Comentario:** Escribe "Esta es una reseña de prueba del sistema. Todo funciona correctamente."
4. Lee el aviso: "Tu reseña será publicada..."
5. Click en **"ENVIAR RESEÑA"**

**Resultado:** Verás mensaje de éxito ✅

---

### PASO 5: Verificar Reseña en Admin

1. Vuelve al **Dashboard Admin**
2. Click en **"Ver Reseñas"** (botón en la barra superior)
3. Busca tu reseña de prueba
4. Verás:
   - Estado: **PENDIENTE** (amarillo)
   - Tu nombre: TEST RESEÑA
   - Tu calificación: ⭐⭐⭐⭐⭐
   - Tu comentario
5. Tienes 3 opciones:
   - **✅ Aprobar:** La reseña aparecerá en la landing page
   - **❌ Rechazar:** La reseña NO aparecerá en la landing
   - **🗑️ Eliminar:** Borrar permanentemente

---

### PASO 6: Aprobar y Verificar en Landing

1. Click en **"✅ Aprobar"** en tu reseña de prueba
2. Confirma la acción
3. Abre: https://silver-croissant-fb9e1d.netlify.app
4. Scroll hasta la sección **"¿QUÉ OPINARON LOS VISITANTES?"**
5. Busca tu reseña: Debería aparecer con:
   - Nombre: **TEST RESEÑA**
   - Fecha: Hoy
   - Comentario: Tu texto

**✨ ¡SISTEMA FUNCIONANDO CORRECTAMENTE!**

---

## 🧪 CASOS DE PRUEBA ADICIONALES

### TEST 1: Token Inválido

**Objetivo:** Verificar que tokens falsos no funcionan

1. Copia este link: `https://silver-croissant-fb9e1d.netlify.app/dejar-resena.html?token=fake123`
2. Pégalo en el navegador
3. **Resultado esperado:** Error "Token inválido. Por favor, usa el link que recibiste por WhatsApp."

---

### TEST 2: Token Ya Usado

**Objetivo:** Verificar que un link no se puede usar 2 veces

1. Usa el mismo link del PASO 3
2. Intenta dejar otra reseña
3. **Resultado esperado:** Error de token ya usado o inválido

---

### TEST 3: Validación de Formulario

**Objetivo:** Verificar validaciones del formulario

**3A: Sin seleccionar estrellas**
1. Abre link de reseña válido
2. Escribe comentario pero NO selecciones estrellas
3. Click en "ENVIAR RESEÑA"
4. **Resultado esperado:** Error "Por favor, seleccioná una calificación (estrellas)"

**3B: Sin comentario**
1. Selecciona 5 estrellas
2. Deja el comentario VACÍO
3. Click en "ENVIAR RESEÑA"
4. **Resultado esperado:** Error del navegador "Este campo es obligatorio"

---

### TEST 4: Reseña Rechazada

**Objetivo:** Verificar que reseñas rechazadas no aparecen

1. Crea otra reserva de prueba
2. Finaliza y genera link
3. Deja reseña con texto: "Reseña para RECHAZAR"
4. En admin, click en **"❌ Rechazar"**
5. Ve a la landing page
6. **Resultado esperado:** Esta reseña NO aparece en la lista

---

### TEST 5: Múltiples Reseñas

**Objetivo:** Verificar rotación de reseñas en landing

1. Crea 3 reservas de prueba diferentes
2. Genera links y deja 3 reseñas diferentes
3. Aprueba las 3
4. Ve a la landing page
5. **Resultado esperado:** 
   - Se muestran 4-5 reseñas aleatorias
   - Cada 15 segundos rotan (cambian)
   - Tus reseñas están incluidas

---

## 🔍 DEBUGGING: Si algo no funciona

### Problema 1: "Token inválido" al abrir link válido

**Solución:**
1. Verifica que el link empiece con: `https://silver-croissant-fb9e1d.netlify.app`
2. Verifica que el token tenga longitud (no esté vacío)
3. Abre DevTools (F12) → Console
4. Mira si hay errores de API
5. Verifica en Railway que el backend esté activo

---

### Problema 2: No aparece botón "Marcar como Finalizada"

**Solución:**
1. Verifica que la reserva esté en estado **"confirmada"** o **"preconfirmada"**
2. Si está "cancelada" o "finalizada", no se puede marcar de nuevo
3. Crea una nueva reserva de prueba

---

### Problema 3: Reseña aprobada no aparece en landing

**Solución:**
1. Refresca la página (Ctrl+R o Cmd+R)
2. Limpia caché: Ctrl+Shift+R o Cmd+Shift+R
3. Verifica en admin que el estado sea **"APROBADA"** (verde)
4. Espera 15 segundos (las reseñas rotan)

---

### Problema 4: WhatsApp no se abre

**Solución:**
1. Verifica que el número de teléfono tenga formato correcto: +54911...
2. Si no tienes WhatsApp Web instalado, copia el link manualmente
3. Usa el botón "📋 Copiar Link" en su lugar

---

## 📊 CHECKLIST FINAL

Marca cada ítem cuando lo hayas probado:

- [ ] ✅ Crear reserva de prueba en producción
- [ ] ✅ Finalizar reserva y generar link
- [ ] ✅ Copiar link desde admin
- [ ] ✅ Abrir link de reseña
- [ ] ✅ Completar formulario de reseña
- [ ] ✅ Verificar reseña pendiente en admin
- [ ] ✅ Aprobar reseña
- [ ] ✅ Ver reseña aprobada en landing page
- [ ] ✅ Probar token inválido (debe fallar)
- [ ] ✅ Probar validación de formulario
- [ ] ✅ Rechazar una reseña (no debe aparecer)
- [ ] ✅ Eliminar una reseña

---

## 🎉 RESUMEN

**Sistema funcional si:**
1. ✅ Links generados usan URL de producción (no localhost)
2. ✅ Tokens se validan correctamente
3. ✅ Reseñas pendientes aparecen en admin
4. ✅ Reseñas aprobadas aparecen en landing
5. ✅ Reseñas rechazadas NO aparecen
6. ✅ WhatsApp abre con mensaje correcto

**¡TODO LISTO PARA USAR EN PRODUCCIÓN!** 🚀
