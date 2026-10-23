# Ejercicio 04 · 🍜 Food Spots

**Crear datos desde el móvil** · `POST /restaurantes` · base de datos `databridge_e04`

Concepto nuevo: **POST · Body · DTO · create() · save()**

Un formulario en React Native envía un restaurante nuevo a la API de NestJS, que lo guarda en PostgreSQL mediante TypeORM.

```
React Native → HTTP → POST /restaurantes → Controller → Service → Repository → PostgreSQL
```

## Estructura

```
EJERCICIO-04/
├── backend/                               NestJS + TypeORM + PostgreSQL
│   └── src/
│       ├── main.ts                        Arranca NestJS, habilita CORS y escucha en 0.0.0.0:3000
│       ├── app.module.ts                  Conexión TypeORM con databridge_e04
│       └── restaurantes/
│           ├── restaurante.entity.ts      Entity persistente (tabla restaurantes)
│           ├── create-restaurante.dto.ts  Forma del Body de creación
│           ├── restaurantes.module.ts     Registra Controller, Service y Entity
│           ├── restaurantes.service.ts    create() + save() con Repository
│           └── restaurantes.controller.ts Recibe el POST con @Body()
├── frontend/
│   └── App.tsx                            Formulario que envía el POST y muestra la tarjeta
└── README.md
```

## Cómo ejecutarlo

### 1. Base de datos

```sql
psql -U postgres
CREATE DATABASE databridge_e04;
\q
```

### 2. Backend

```bash
cd backend
npm install
npm run start:dev
```

La API queda disponible en `http://localhost:3000`.

Prueba del endpoint:

```bash
curl -i -X POST http://localhost:3000/restaurantes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"La Trattoria","tipo":"Italiano","ciudad":"Zaragoza","puntuacion":9,"precioMedio":25}'
```

Comprobación en PostgreSQL:

```sql
psql -U postgres -d databridge_e04
SELECT * FROM restaurantes;
```

### 3. Frontend

```bash
cd frontend
npm install
npx expo start
```

En `App.tsx`, `API_URL` debe apuntar a la IPv4 del PC (`ipconfig`), porque en un móvil físico `localhost` es el propio móvil. PC y móvil deben estar en la misma red.

## Modifícalo · precioMedio

Se ha añadido el campo `precioMedio` en todo el recorrido del dato:

| Capa | Cambio |
|---|---|
| `restaurante.entity.ts` | `@Column({ type: 'int', default: 0 }) precioMedio` → nueva columna en PostgreSQL |
| `create-restaurante.dto.ts` | `precioMedio: number` → puede llegar en el Body |
| `App.tsx` · formulario | `TextInput` con teclado numérico para el precio |
| `App.tsx` · POST | `precioMedio: Number(precioMedio)` dentro de `JSON.stringify` |
| `App.tsx` · tarjeta | Muestra el restaurante devuelto por la API con `Precio medio: 25 €` |

## Lo que he aprendido

- `@Body()` obtiene el JSON enviado por React Native.
- `CreateRestauranteDto` describe la forma de los datos de entrada.
- `repository.create(dto)` construye una Entity en memoria.
- `repository.save(...)` persiste esa Entity en PostgreSQL.
- `JSON.stringify` convierte el objeto del formulario en JSON para el POST.

**¿Por qué Entity y DTO no representan exactamente la misma responsabilidad?**
La Entity representa cómo se **guarda** un restaurante en PostgreSQL (incluye el `id` generado y los tipos de columna). El DTO representa lo que el cliente **envía** en el Body de la petición HTTP. Por eso `precioMedio` aparece en los dos: en la Entity para persistirlo y en el DTO para que pueda llegar desde el móvil.
