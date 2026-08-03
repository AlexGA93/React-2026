# 04-hooks-app

Este proyecto es una guía práctica de React Hooks en TypeScript, organizada por carpetas para ir viendo los conceptos de forma progresiva. Cada sección muestra un ejemplo concreto que refleja la idea central del hook o la técnica que se está explicando.

## ¿Qué aprenderás aquí?

Este proyecto recorre de forma ordenada:

- Estado local con useState
- Efectos secundarios con useEffect
- Lógica reutilizable con Custom Hooks
- Ejemplos con datos asíncronos
- Referencias a elementos del DOM con useRef
- Gestión de estados complejos con useReducer
- Optimización de renderizados con useMemo, useCallback y memo
- UI optimista con useOptimistic y useTransition
- Suspense con use()
- Contexto global con useContext y React Router

## Requisitos

- Node.js 20+
- pnpm

## Instalación y ejecución

```bash
pnpm install
pnpm dev
```

La aplicación queda disponible en la URL local de Vite, normalmente en http://localhost:5173/.

## Estructura del proyecto

La carpeta src está organizada por secciones temáticas:

- 01-useState
- 02-useEffect
- 03-customHook
- 04-examples
- 05-useRef
- 06-useReducer_TasksApp
- 07-useReducer_ScrambleWords
- 08-useMemo
- 09-useOptimistic
- 10-use-suspense
- 11-useContext

## 01-useState: semáforo con estado local

En esta sección se muestra el uso de useState para manejar el estado interno de un componente.

El ejemplo principal es TrafficLight, donde el componente guarda qué luz está activa: rojo, amarillo o verde. Al hacer clic en un botón, se actualiza el estado y el componente vuelve a renderizar para mostrar solo la luz seleccionada.

Conceptos que se trabajan:
- Estado local
- Actualización de estado
- Renderizado reactivo

## 02-useEffect: semáforo con efectos y temporizador

Aquí se introduce useEffect para reaccionar a cambios de estado y sincronizar efectos secundarios.

En TrafficLightWithEffect se añade un contador y un intervalo que cambia la luz automáticamente cada cierto tiempo. Además, se muestra cómo limpiar el intervalo con la función de limpieza del efecto para evitar comportamientos no deseados.

Conceptos que se trabajan:
- useEffect
- Dependencias del efecto
- Limpieza de efectos
- Ciclo de vida del componente

## 03-customHook: reutilizar lógica con un hook propio

En esta carpeta se extrae la lógica del semáforo a un custom hook.

TrafficLightWithHook usa useTrafficLight para encapsular el estado del contador, el cálculo del porcentaje y la lógica para resaltar la luz activa. Esto demuestra que la lógica reutilizable puede moverse fuera del componente para dejar la UI más limpia.

Conceptos que se trabajan:
- Custom Hooks
- Separación de lógica y UI
- Reutilización de comportamiento

## 04-examples: ejemplo con Pokémon y hooks personalizados

La carpeta 04-examples incluye PokemonPage, un ejemplo en el que se combinan hooks personalizados para trabajar con datos asíncronos.

Se utilizan:
- useCounter para controlar un contador
- usePokemon para obtener información del Pokémon según el id actual

El componente muestra un estado de carga mientras se obtiene la información, un estado de datos no encontrados y botones para navegar al Pokémon anterior o siguiente.

Conceptos que se trabajan:
- Hooks personalizados
- Peticiones asíncronas
- Manejo de estados de carga y datos vacíos

## 05-useRef: enfocar un input sin provocar re-render

En FocusScreen se usa useRef para guardar una referencia al input del DOM.

Al pulsar el botón, el componente accede al elemento por referencia y lo selecciona, sin necesidad de usar estado para lograrlo. Esto es útil cuando se necesita interactuar directamente con un elemento del DOM.

Conceptos que se trabajan:
- useRef
- Acceso directo a elementos del DOM
- Evitar renders innecesarios

## 06-useReducer_TasksApp: gestor de tareas con reducer

Esta sección transforma la lógica de una lista de tareas a un patrón más escalable con useReducer.

El ejemplo principal es TasksApp, que gestiona tareas con un reducer y un custom hook llamado useTodo. Cada acción representa una operación como añadir, alternar o eliminar una tarea. Además, el estado se guarda en localStorage para persistir la información.

También se usa Zod para validar el contenido que se recupera desde el almacenamiento.

Conceptos que se trabajan:
- useReducer
- Acciones y estado centralizado
- Reducers
- Persistencia con localStorage
- Validación de datos

## 07-useReducer_ScrambleWords: juego con reducer

En ScrambleWords se implementa un juego de palabras desordenadas usando useReducer.

El estado maneja:
- la palabra actual
- la respuesta del usuario
- los errores
- los saltos
- los puntos
- el estado de fin de juego

Cada intento dispara una acción que actualiza el reducer. Además, cuando el usuario consigue un punto, se muestra un efecto de confeti.

Conceptos que se trabajan:
- useReducer en un caso de juego
- Lógica basada en acciones
- Estado complejo
- Efectos secundarios en respuesta a cambios

## 08-useMemo: optimización de renderizados

En MemoHook se demuestra cómo evitar renders innecesarios con useMemo, useCallback, memo y React.memo.

El ejemplo incluye componentes hijos memorizados para que no se vuelvan a renderizar cuando sus props no han cambiado. La función de callback también se memoriza para conservar la misma referencia entre renders.

Conceptos que se trabajan:
- useMemo
- useCallback
- React.memo
- Optimización de rendimiento

## 09-useOptimistic: UI optimista con transición

La carpeta 09-useOptimistic muestra un ejemplo de UI optimista con InstagromApp.

Al enviar un comentario, la interfaz muestra inmediatamente el mensaje como si ya hubiera sido guardado, mientras la operación real sigue ejecutándose en segundo plano. Se combina useOptimistic con useTransition para que la interacción no bloquee la UI.

Conceptos que se trabajan:
- useOptimistic
- useTransition
- Respuesta inmediata del usuario
- Simulación de operaciones asíncronas

## 10-use-suspense: Suspense y use()

En esta sección se muestra cómo trabajar con recursos asíncronos usando Suspense y el hook use().

El componente ClientInformation lee un recurso obtenido desde una promesa simulada. Mientras la información está cargando, React puede suspender el render y esperar a que el recurso esté listo.

Conceptos que se trabajan:
- Suspense
- use()
- Recursos asíncronos
- Rendizado diferido

## 11-useContext: autenticación con contexto y rutas protegidas

Esta es la sección más completa y muestra cómo compartir estado global con React Context.

El flujo del ejemplo es:
- UserContextProvider crea el contexto de autenticación
- LoginPage permite iniciar sesión con un id de usuario
- ProfilePage muestra la información del usuario autenticado
- AboutPage cambia su contenido según si el usuario está autenticado o no
- PrivateRoute protege rutas que solo deben verse cuando el usuario está logueado
- appRouter define las rutas con React Router

Además, el usuario autenticado se persiste en localStorage para que al recargar la página el estado se restaure.

Conceptos que se trabajan:
- createContext
- useContext
- Provider
- Rutas privadas
- Navegación con React Router
- Persistencia de sesión

## Resumen general

Este proyecto está pensado como una ruta de aprendizaje progresiva para entender cómo React maneja:

- estado
- efectos
- lógica reutilizable
- rendimiento
- datos asíncronos
- navegación
- contexto global

Es ideal para ver cómo evolucionan los ejemplos desde un componente simple hasta una aplicación con arquitectura más organizada.
