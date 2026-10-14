# SPA de Catalogo y Carrito de Compras en React + Vite

**Autor:** Pariona Ramos Saul Anibal  
**Proyecto:** Aplicacion Web de Pagina Unica (Single Page Application - SPA)  
**Tecnologias:** React, TypeScript, Vite, Tailwind CSS / CSS Modules  

---

## Que es una SPA (Single Page Application)?

Una **SPA (Single Page Application)** o Aplicacion de Pagina Unica es una arquitectura de desarrollo web en la cual la aplicacion se carga en el navegador una sola vez (mediante un unico archivo `index.html`). 

A medida que el usuario interactua con la plataforma —buscando productos, filtrando por categorias, cambiando el tema de la interfaz o gestionando el carrito de compras— **la pagina no se recarga completamente**. En su lugar, JavaScript (a traves de React) intercepta las interacciones y reescribe dinamicamente el DOM localmente, logrando:
* Mayor fluidez y velocidad: Se eliminan los tiempos de espera por recarga de pagina.
* Experiencia de usuario (UX) similar a una aplicacion nativa.
* Gestion eficiente de estados: Los datos persisten y cambian de forma reactiva en el cliente.

---

## Descripcion del Proyecto

Este proyecto es una SPA interactiva de un catalogo de hamburguesas desarrollada en React y TypeScript. Permite a los usuarios explorar productos, aplicar filtros en tiempo real, alternar el tema visual entre modo dia y noche, y gestionar sus pedidos mediante un carrito dinamico con integracion directa a WhatsApp.

### Caracteristicas Principales:
* Carga de Datos Asincrona (`useFetch`): Consulta dinamica desde un archivo JSON con cancelacion de peticiones mediante `AbortController`.
* Arquitectura de Estado Global (`Context API`): Modulos independientes para el Tema visual (`ThemeContext`), Sistema de Alertas (`ToastContext`) y Estado del Carrito (`CartContext`).
* Optimizacion de Rendimiento: Implementacion de `useMemo`, `useCallback`, `useRef` y `React.memo` para evitar re-renderizados innecesarios.
* Logica Compleja e Inmutable (`useReducer`): Control del estado del carrito mediante acciones puras (`add`, `inc`, `dec`, `remove`, `clear`).
* Monitoreo de Desarrollo: Integracion con `React.StrictMode` y analisis con `React DevTools Profiler`.

---

## Evidencia de Funcionamiento de la SPA (Entorno Local)

*Nota: Asegurate de guardar tus capturas de pantalla dentro de una carpeta llamada `docs/` o `assets/` en la raiz de tu proyecto para que se visualicen correctamente en este README.*

### 1. Vista General de la SPA
Demostracion de la aplicacion cargada en el servidor local (`http://localhost:5173/`) mostrando el encabezado, buscador, categorias y el catalogo de productos.

![Vista General de la SPA](./docs/01-vista-general.png)
*Figura 1: Interfaz principal de la SPA ejecutandose de manera local.*

---

### 2. Ciclo de Renderizado y Profiling (Paso 1)
Uso de React DevTools Profiler para monitorear los commits y comprobar que los renderizados ocurren unicamente en los componentes necesarios al interactuar con la aplicacion.

![React DevTools Profiler](./docs/02-profiler.png)
*Figura 2: Analisis de rendimiento y re-renderizados con React DevTools.*

---

### 3. Carga Asincrona, Manejo de Errores y Reintento (Paso 2)
Implementacion del Hook personalizado `useFetch` con manejo de estados `loading`, `error` y cancelacion de solicitudes con `AbortController`.

| Estado de Carga | Manejo de Error / Reintento |
| :---: | :---: |
| ![Estado de Carga](./docs/03-loading.png) | ![Pantalla de Error](./docs/03-error.png) |
| *Figura 3.1: Indicador de carga activa.* | *Figura 3.2: Boton de reintento ante un fallo de red.* |

---

### 4. Gestion de Tema Global Dia/Noche con Context API (Paso 3)
Cambio de tema dinamico en toda la aplicacion consumiendo `useTheme()` sin incurrir en prop drilling. La preferencia del usuario se persiste en `localStorage`.

| Modo Dia (Light) | Modo Noche (Dark) |
| :---: | :---: |
| ![Modo Dia](./docs/04-tema-dia.png) | ![Modo Noche](./docs/04-tema-noche.png) |
| *Figura 4.1: SPA en Modo Dia.* | *Figura 4.2: SPA en Modo Noche.* |

---

### 5. Carrito de Compras Dinamico y Sistema de Notificaciones (Pasos 3, 4 y 5)
Despliegue del panel lateral del carrito (Drawer), notificaciones flotantes (Toasts) activadas por `useToast()`, y uso de `useReducer` para la modificacion inmutable de productos.

![Carrito y Notificaciones](./docs/05-carrito-toast.png)
*Figura 5: Panel del carrito desplegado, modificacion de cantidades y alerta flotante activa.*

---

## Instalacion y Ejecucion Local

Para ejecutar esta SPA localmente en tu computadora, sigue estos pasos:

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/saulPariona/Semana-7-AGuilar.git](https://github.com/saulPariona/Semana-7-AGuilar.git)
