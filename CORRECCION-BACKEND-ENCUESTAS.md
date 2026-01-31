# INSTRUCCIONES: Corrección del Sistema de Encuestas
## Eliminar campos NO solicitados (piscina, parrilla, instalaciones, limpieza)

---

## ✅ FRONTEND - YA CORREGIDO

Los siguientes archivos YA fueron modificados:
- `sections/encuesta-satisfaccion/encuesta-satisfaccion.js`
- `sections/admin/dashboard/dashboard.js`

---

## ⚠️ BACKEND - REQUIERE TU ACCIÓN

El backend está fuera del workspace actual. Necesitás abrir el proyecto backend y hacer los siguientes cambios:

### 📁 Archivo 1: `EncuestaSatisfaccion.java`

**Ubicación:** `src/main/java/com/quincho/reservas/entity/EncuestaSatisfaccion.java`

**ELIMINAR estas 4 columnas:**

```java
// ❌ ELIMINAR ESTAS LÍNEAS:
@Column(name = "calificacion_piscina")
@Min(value = 1, message = "La calificación de piscina debe ser al menos 1")
@Max(value = 5, message = "La calificación de piscina no puede ser mayor a 5")
private Integer calificacionPiscina;

@Column(name = "calificacion_parrilla")
@Min(value = 1, message = "La calificación de parrilla debe ser al menos 1")
@Max(value = 5, message = "La calificación de parrilla no puede ser mayor a 5")
private Integer calificacionParrilla;

@Column(name = "calificacion_instalaciones")
@Min(value = 1, message = "La calificación de instalaciones debe ser al menos 1")
@Max(value = 5, message = "La calificación de instalaciones no puede ser mayor a 5")
private Integer calificacionInstalaciones;

@Column(name = "calificacion_limpieza")
@Min(value = 1, message = "La calificación de limpieza debe ser al menos 1")
@Max(value = 5, message = "La calificación de limpieza no puede ser mayor a 5")
private Integer calificacionLimpieza;
```

**También eliminar sus getters/setters** si están al final del archivo.

---

### 📁 Archivo 2: `EncuestaRequestDTO.java`

**Ubicación:** `src/main/java/com/quincho/reservas/dto/EncuestaRequestDTO.java`

**ELIMINAR estas 4 propiedades:**

```java
// ❌ ELIMINAR ESTAS LÍNEAS:
@Min(value = 1, message = "La calificación debe ser entre 1 y 5")
@Max(value = 5, message = "La calificación debe ser entre 1 y 5")
private Integer calificacionPiscina;

@Min(value = 1, message = "La calificación debe ser entre 1 y 5")
@Max(value = 5, message = "La calificación debe ser entre 1 y 5")
private Integer calificacionParrilla;

@Min(value = 1, message = "La calificación debe ser entre 1 y 5")
@Max(value = 5, message = "La calificación debe ser entre 1 y 5")
private Integer calificacionInstalaciones;

@Min(value = 1, message = "La calificación debe ser entre 1 y 5")
@Max(value = 5, message = "La calificación debe ser entre 1 y 5")
private Integer calificacionLimpieza;
```

**También eliminar sus getters/setters**.

---

### 📁 Archivo 3: `EncuestaResponseDTO.java`

**Ubicación:** `src/main/java/com/quincho/reservas/dto/EncuestaResponseDTO.java`

**ELIMINAR estas 4 propiedades:**

```java
// ❌ ELIMINAR ESTAS LÍNEAS:
private Integer calificacionPiscina;
private Integer calificacionParrilla;
private Integer calificacionInstalaciones;
private Integer calificacionLimpieza;
```

**Si usás @Builder.Default o similar, eliminá esas anotaciones también.**

---

### 📁 Archivo 4: `EncuestaSatisfaccionService.java`

**Ubicación:** `src/main/java/com/quincho/reservas/service/EncuestaSatisfaccionService.java`

**EN EL MÉTODO `crearEncuestaConToken()`:**

Buscar donde se copian los datos del DTO a la entidad y **ELIMINAR**:

```java
// ❌ ELIMINAR ESTAS LÍNEAS:
encuesta.setCalificacionPiscina(dto.getCalificacionPiscina());
encuesta.setCalificacionParrilla(dto.getCalificacionParrilla());
encuesta.setCalificacionInstalaciones(dto.getCalificacionInstalaciones());
encuesta.setCalificacionLimpieza(dto.getCalificacionLimpieza());
```

**EN EL MÉTODO `obtenerEstadisticas()`:**

Buscar el cálculo de promedios y **ELIMINAR**:

```java
// ❌ ELIMINAR TODO EL BLOQUE DE CÁLCULOS DE ÁREAS:
estadisticas.put("promedioCalificacionPiscina", 
    calcularPromedioOpcional(encuestas, EncuestaSatisfaccion::getCalificacionPiscina));
estadisticas.put("promedioCalificacionParrilla", 
    calcularPromedioOpcional(encuestas, EncuestaSatisfaccion::getCalificacionParrilla));
estadisticas.put("promedioCalificacionInstalaciones", 
    calcularPromedioOpcional(encuestas, EncuestaSatisfaccion::getCalificacionInstalaciones));
estadisticas.put("promedioCalificacionLimpieza", 
    calcularPromedioOpcional(encuestas, EncuestaSatisfaccion::getCalificacionLimpieza));
```

**Nota:** El método `calcularPromedioOpcional()` puede quedarse, no molesta.

---

### 📁 Archivo 5: `03-crear-sistema-encuestas.sql`

**Ubicación:** Carpeta raíz del proyecto backend o en `src/main/resources/db/migration/`

**MODIFICAR el CREATE TABLE:**

**ANTES (con 17 columnas):**
```sql
CREATE TABLE IF NOT EXISTS encuestas_satisfaccion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    reserva_id BIGINT NOT NULL,
    
    -- Preguntas principales (obligatorias)
    satisfaccion_general INT NOT NULL CHECK (satisfaccion_general BETWEEN 1 AND 5),
    cumplio_expectativas INT NOT NULL CHECK (cumplio_expectativas BETWEEN 1 AND 5),
    recomendaria INT NOT NULL CHECK (recomendaria BETWEEN 1 AND 5),
    volveria INT NOT NULL CHECK (volveria BETWEEN 1 AND 5),
    
    -- Evaluación por áreas (opcionales) ❌ ELIMINAR ESTAS 4 LÍNEAS
    calificacion_piscina INT CHECK (calificacion_piscina BETWEEN 1 AND 5),
    calificacion_parrilla INT CHECK (calificacion_parrilla BETWEEN 1 AND 5),
    calificacion_instalaciones INT CHECK (calificacion_instalaciones BETWEEN 1 AND 5),
    calificacion_limpieza INT CHECK (calificacion_limpieza BETWEEN 1 AND 5),
    
    -- Comentarios de texto (opcionales)
    por_que_recomendaria TEXT,
    que_gusto TEXT,
    que_mejorar TEXT,
    que_agregar TEXT,
    
    fecha_respuesta DATETIME NOT NULL,
    
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    INDEX idx_fecha_respuesta (fecha_respuesta)
);
```

**DESPUÉS (con 13 columnas):**
```sql
CREATE TABLE IF NOT EXISTS encuestas_satisfaccion (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cliente_id BIGINT NOT NULL,
    reserva_id BIGINT NOT NULL,
    
    -- Preguntas principales (obligatorias)
    satisfaccion_general INT NOT NULL CHECK (satisfaccion_general BETWEEN 1 AND 5),
    cumplio_expectativas INT NOT NULL CHECK (cumplio_expectativas BETWEEN 1 AND 5),
    recomendaria INT NOT NULL CHECK (recomendaria BETWEEN 1 AND 5),
    volveria INT NOT NULL CHECK (volveria BETWEEN 1 AND 5),
    
    -- Comentarios de texto (opcionales)
    por_que_recomendaria TEXT,
    que_gusto TEXT,
    que_mejorar TEXT,
    que_agregar TEXT,
    
    fecha_respuesta DATETIME NOT NULL,
    
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    INDEX idx_fecha_respuesta (fecha_respuesta)
);
```

**El ALTER TABLE de `reservas` NO cambia** (sigue igual).

---

## 🔍 RESUMEN DE CAMPOS FINALES

### ✅ Campos que QUEDAN (8 campos + metadatos):

**Obligatorios (4):**
1. `satisfaccion_general` INT NOT NULL (1-5)
2. `cumplio_expectativas` INT NOT NULL (1-5)
3. `recomendaria` INT NOT NULL (1-5)
4. `volveria` INT NOT NULL (1-5)

**Opcionales (4):**
5. `por_que_recomendaria` TEXT
6. `que_gusto` TEXT
7. `que_mejorar` TEXT
8. `que_agregar` TEXT

**Metadata:**
- `cliente_id`, `reserva_id`, `fecha_respuesta`

### ❌ Campos ELIMINADOS (4):
- `calificacion_piscina`
- `calificacion_parrilla`
- `calificacion_instalaciones`
- `calificacion_limpieza`

---

## 📝 CHECKLIST DE VERIFICACIÓN

Antes de ejecutar el SQL o deployar:

- [ ] EncuestaSatisfaccion.java - Eliminados 4 campos
- [ ] EncuestaRequestDTO.java - Eliminados 4 campos
- [ ] EncuestaResponseDTO.java - Eliminados 4 campos
- [ ] EncuestaSatisfaccionService.java - Eliminados setters y cálculos
- [ ] 03-crear-sistema-encuestas.sql - Tabla con solo 13 columnas
- [ ] Frontend ya corregido (encuesta-satisfaccion.js, dashboard.js)

---

## 🚀 PRÓXIMOS PASOS

1. **Hacer cambios en backend** (según este documento)
2. **Compilar backend** para verificar que no hay errores
3. **Ejecutar SQL en Railway MySQL**
4. **Hacer commit de frontend y backend**
5. **Push a GitHub** (auto-deploy)
6. **Probar flujo completo en producción**

---

## ⚠️ IMPORTANTE

**NO ejecutes el SQL en Railway hasta haber modificado el código Java**, porque si la tabla tiene columnas que el código no espera (o viceversa), habrá errores.

**Orden correcto:**
1. Modificar código Java (backend)
2. Compilar y verificar
3. Ejecutar SQL en Railway
4. Deploy

---

¿Necesitás ayuda con algún paso específico?
