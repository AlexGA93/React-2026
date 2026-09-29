# Heroes App

Aplicación de práctica con React, TypeScript, Vite, React Router y gestión de datos con Axios + TanStack Query.

## Descripción general

Esta app está pensada para listar héroes y villanos, navegar por su detalle y mantener una experiencia de filtrado por secciones. El flujo principal se basa en:

- obtener los datos desde una API externa,
- encapsular la lógica de petición en capas bien definidas,
- mantener el estado de UI sincronizado con la URL,
- usar hooks reutilizables para separar lógica de presentación,
- reducir llamadas innecesarias usando caché y query params.

---

## 1. Patrón de la app: lógica separada por capas

El proyecto sigue una estructura clara para mantener el código ordenado y reutilizable:

- [src/heroes/api/hero.api.ts](src/heroes/api/hero.api.ts): configuración de Axios
- [src/heroes/actions/get-heroes-by-page.action.ts](src/heroes/actions/get-heroes-by-page.action.ts): lógica de negocio para transformar y consultar la API
- [src/heroes/hooks/usePaginatedHero.tsx](src/heroes/hooks/usePaginatedHero.tsx): custom hook que encapsula `useQuery`
- [src/heroes/hooks/useQueryParameters.tsx](src/heroes/hooks/useQueryParameters.tsx): lectura y validación de query parameters
- [src/heroes/pages/home/HomePage.tsx](src/heroes/pages/home/HomePage.tsx): composición de la vista usando hooks y componentes

Esto permite que la vista no tenga lógica de fetch ni parsing de parámetros, y que el componente se centre en renderizar.

---

## 2. Custom hooks: reutilizar la lógica de datos y navegación

Los custom hooks permiten encapsular lógica reutilizable en un solo sitio.

### 2.1 Hook para gestionar query parameters

En [src/heroes/hooks/useQueryParameters.tsx](src/heroes/hooks/useQueryParameters.tsx) se centraliza la lectura de la URL.

```tsx
import { useMemo } from "react";
import { useSearchParams } from "react-router";

export const useQueryParameters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const category = searchParams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  return {
    page,
    limit,
    category,
    selectedTab,
    setSearchParams,
  };
};
```

### ¿Cuál es su utilidad?

- evita duplicar lógica en varios componentes,
- centraliza la validación del estado de navegación,
- mantiene la URL como fuente de verdad,
- hace que la lógica sea más legible y fácil de testear.

### 2.2 Hook para la consulta paginada

En [src/heroes/hooks/usePaginatedHero.tsx](src/heroes/hooks/usePaginatedHero.tsx) se encapsula la llamada a la API usando `useQuery`.

```tsx
import { useQuery } from "@tanstack/react-query";
import { getHeroApiByPageAction } from "../actions/get-heroes-by-page.action";

export const usePaginatedHero = ({ page, limit, category = "all" }) => {
  return useQuery({
    queryKey: ["heroes", { page, limit, category }],
    queryFn: () => getHeroApiByPageAction(page, limit, category),
    staleTime: 1000 * 60 * 5,
  });
};
```

### ¿Cuál es su utilidad?

- encapsula la lógica de fetching en un hook reutilizable,
- deja el componente limpio,
- mantiene la clave de caché asociada a los parámetros reales de la consulta,
- facilita reutilizar la misma query en otras pantallas.

---

## 3. Query parameters frente a `useState`

La app prioriza `useSearchParams` en lugar de guardar la pestaña activa solamente en un estado local.

```tsx
const [searchParams, setSearchParams] = useSearchParams();
const activeTab = searchParams.get("tab") ?? "all";
```

### ¿Por qué es mejor este enfoque?

- la pestaña forma parte de la navegación, no solo del render,
- la vista se conserva al recargar la página,
- se puede compartir la URL con el estado actual,
- el navegador conserva el historial de navegación,
- facilita volver atrás/adelante con la vista exacta restaurada.

### Ejemplo de actualización de la URL

```tsx
const handleSearchParams = (section: string, category: string = "all") => {
  setSearchParams((prev) => {
    prev.set("tab", section);
    prev.set("category", category);
    prev.set("page", "1");
    return prev;
  });
};
```

Esto hace que la navegación quede representada como:

```txt
?tab=heroes&category=hero&page=1
```

Eso es muy útil porque cada filtro o sección queda cargado desde la URL y no depende solo del estado interno del componente.

---

## 4. Axios: configuración centralizada

La configuración base de la API está en [src/heroes/api/hero.api.ts](src/heroes/api/hero.api.ts).

```ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const heroApi = axios.create({
  baseURL: `${BASE_URL}/api/heroes`,
});
```

### ¿Para qué sirve?

- define la base URL del backend,
- evita repetir la URL en cada fetch,
- encapsula detalles de configuración del cliente HTTP,
- permite mantener todas las peticiones de una misma entidad bajo un mismo punto de entrada.

En un proyecto real, esto facilita cambiar el backend o aplicar interceptores más adelante sin tocar toda la app.

---

## 5. Relación entre Axios y las actions

Las actions son la capa que conecta la API con la lógica del negocio.

En [src/heroes/actions/get-heroes-by-page.action.ts](src/heroes/actions/get-heroes-by-page.action.ts) se hace la petición y además se normalizan los datos.

```ts
import { heroApi } from "../api/hero.api";

export const getHeroApiByPageAction = async (
  page: number,
  limit: number = 6,
  category: string = "all",
) => {
  const { data } = await heroApi.get("/", {
    params: {
      limit,
      offset: (page - 1) * limit,
      category,
    },
  });

  const heroes = data.heroes.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.id}.jpeg`,
  }));

  return {
    ...data,
    heroes,
  };
};
```

### ¿Qué hace aquí?

- usa el cliente configurado de Axios,
- envía `limit`, `offset` y `category` como parámetros de la URL,
- transforma la respuesta para que cada héroe incluya la imagen completa,
- devuelve un objeto ya listo para consumir en la UI.

Esto separa perfectamente la petición HTTP de la vista. La UI solo debe consumir el resultado final.

---

## 6. Implementación real en los componentes

La pantalla principal usa los hooks en lugar de hacer fetch directo dentro del componente.

Archivo: [src/heroes/pages/home/HomePage.tsx](src/heroes/pages/home/HomePage.tsx)

```tsx
const { page, limit, category, selectedTab, setSearchParams } =
  useQueryParameters();

const { data: heroesResponse } = usePaginatedHero({
  page: +page,
  limit: +limit,
  category,
});
```

### ¿Qué está pasando aquí?

1. `useQueryParameters()` lee la URL y devuelve los valores actualizados.
2. `usePaginatedHero()` genera la query con esos parámetros.
3. React Query maneja el estado de carga, caché y revalidación.
4. El componente renderiza la lista con `heroesResponse?.heroes ?? []`.
5. La URL se mantiene como estado de navegación y como referencia del contexto actual.

Esto es una buena práctica porque el componente se vuelve más declarativo y mantiene una sola responsabilidad: renderizar.

---

## 7. React Query y la clave de la consulta

La clave `queryKey` identifica cada consulta en el caché.

```tsx
queryKey: ["heroes", { page, limit, category }];
```

### ¿Por qué usar un objeto dentro del array?

Porque cada parámetro afecta la respuesta del backend y debe formar parte de la identidad de la consulta:

- la página cambia el offset,
- el límite cambia la cantidad de elementos,
- la categoría filtra el tipo de héroes.

Si cambian esos valores, React Query detecta que es otra consulta y la maneja de forma separada.

Esto hace que el caché sea más preciso y evita mezclar datos de distintas combinaciones.

---

## 8. Paginación y navegación: relación entre URL, filtros y query params

La paginación en esta app no se maneja como un estado local aislado del componente, sino como parte del estado de navegación. La idea es que la página actual y el límite queden reflejados en la URL, para poder compartir, recargar y restaurar la vista exacta.

### 8.1 El hook de parámetros de navegación

El hook central [src/heroes/hooks/useQueryParameters.tsx](src/heroes/hooks/useQueryParameters.tsx) lee los datos que vienen por query string:

```tsx
const page = searchParams.get("page") ?? "1";
const limit = searchParams.get("limit") ?? "10";
const category = searchParams.get("category") ?? "all";
```

Esto significa que la app no depende de un valor perdido en memoria. En su lugar, la navegación se representa así:

```txt
?page=2&limit=6&category=hero
```

Cuando la URL cambia, cambia también el contexto de la página y la consulta activa.

### 8.2 Cómo se actualiza la URL

El componente principal usa `setSearchParams` para cambiar el valor de los query params y llevar el estado a la URL:

```tsx
const handleSearchParams = (section: string, category: string = "all") => {
  setSearchParams((prev) => {
    prev.set("tab", section);
    prev.set("category", category);
    prev.set("page", "1");
    return prev;
  });
};
```

Esto se usa al cambiar de sección:

```tsx
<TabsTrigger
  value="heroes"
  onClick={() => handleSearchParams("heroes", "hero")}
>
  Heroes ({summary?.heroCount})
</TabsTrigger>
```

Al hacer click en "Heroes", la app no solo activa la pestaña en la UI, también actualiza la URL para mantener una representación exacta del estado.

### 8.3 Relación con la paginación

La paginación se hace mediante `CustomPagination`, un componente que no guarda su estado interno de forma aislada, sino que se guía por la URL.

Componente relacionado:

- [src/components/custom/CustomPagination.tsx](src/components/custom/CustomPagination.tsx)

```tsx
const [searchParams, setSearchParams] = useSearchParams();
const currentPage = Number(searchParams.get("page") ?? 1);
```

La lógica del paginador normalmente hace algo así:

```tsx
const nextPage = currentPage + 1;
setSearchParams((prev) => {
  prev.set("page", String(nextPage));
  return prev;
});
```

Esto produce un cambio visible en la URL y dispara la query de héroes con la nueva página. Como la key de la query incluye esos valores, React Query vuelve a pedir los datos para esa página concreta.

### 8.4 Cómo influye la paginación en la query

En la query del listado, la URL se transforma en parámetros para la API:

```tsx
const { data: heroesResponse } = usePaginatedHero({
  page: +page,
  limit: +limit,
  category,
});
```

Y a su vez, la action envía esos valores al backend:

```ts
const { data } = await heroApi.get("/", {
  params: {
    limit,
    offset: (page - 1) * limit,
    category,
  },
});
```

La fórmula del offset es esencial:

```ts
offset = (page - 1) * limit;
```

Si la página es 1 y el límite es 6, el offset será 0. Si la página es 2, el offset será 6, y así sucesivamente.

### 8.5 Ventaja del patrón

Este enfoque tiene varias ventajas:

- la paginación es compartible por URL,
- el estado se puede conservar al recargar,
- el usuario puede volver atrás/adelante sin perder su posición,
- se evita duplicar lógica de estado local entre componentes,
- el caché de React Query se mantiene consistente con la URL.

### 8.6 Ejemplo completo de flujo

```tsx
// 1. Se lee la pagina actual desde la URL
const { page, limit, category } = useQueryParameters();

// 2. Se traen los datos para esa pagina
const { data } = usePaginatedHero({ page: +page, limit: +limit, category });

// 3. El paginador cambia la URL
const nextPage = Number(page) + 1;
setSearchParams((prev) => {
  prev.set("page", String(nextPage));
  return prev;
});
```

Con este patrón la paginación queda completamente integrada con la navegación, la consulta y la UI.

### Diagrama del flujo de paginación

```mermaid
flowchart LR
    A[Usuario hace click en paginador] --> B[CustomPagination]
    B --> C[setSearchParams actualizar URL]
    C --> D[?page=2&limit=6&category=hero]
    D --> E[useQueryParameters]
    E --> F[page, limit, category]
    F --> G[usePaginatedHero]
    G --> H[queryKey: ["heroes", { page, limit, category }]]
    H --> I[React Query revalida caché]
    I --> J[getHeroApiByPageAction]
    J --> K[heroApi.get('/', { params: { limit, offset, category } })]
    K --> L[Backend responde con heroes de la página]
    L --> M[HomePage renderiza HeroGrid]
    M --> N[Vista actualizada]
```

---

## 9. Flujo completo recomendado del proyecto

1. El usuario interactúa con la UI.
2. Se actualiza la URL con `useSearchParams`.
3. El custom hook lee los parámetros desde la URL.
4. `useQuery` dispara la petición con esos valores.
5. `Axios` realiza la llamada configurada por la instancia.
6. La action transforma la respuesta y devuelve el formato utilizable.
7. El componente renderiza la información y el usuario ve el resultado.
8. La paginación y las tabs actualizan la URL y esto vuelve a disparar la consulta correspondiente.

---

## 10. Stack principal

- React
- TypeScript
- Vite
- React Router
- Axios
- TanStack Query
- Tailwind / shadcn/ui

---

## 10. Comandos básicos

```bash
pnpm install
pnpm dev
```

Con esta estructura, la app mantiene una separación clara entre:

- navegación,
- fetch,
- caché,
- transformación de datos,
- rendering de UI.

Eso hace el proyecto más mantenible, escalable y fácil de extender.
