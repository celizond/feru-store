# EQUIPO
Federico Diaz - Casandra Elizondo

## DESCRIPCIÓN
Realizamos un e-commerce llamado Feru Store, que se integra con la api dummyjson (https://dummyjson.com/). Tiene una home con las mejores ofertas, es decir, productos con mayor descuento, y puede visualizar el historial de productos visitados y recomendados a partir de lo elegido en la wishlist, todos estos estan limitados a 8 elementos para su visualización. Además la aplicación cuenta con una busqueda simple y con filtros, una lista de deseados que pueden agregarse desde el detalle de los productos, y una página de contacto.

## TECNOLOGÍAS
Creamos el proyecto con react + vite y utilizamos react router para la navegación, context api para manejar y agrupar el estado global de favoritos e historial manejados por local storage. Además, generamos el PWA basándonos en la documentacipón de la cátedra, adaptandola un poco para el uso con react.

## ARQUITECTURA
Usamos una arquitectura modular por capas en una SPA (Single Page Application). Separamos responsabilidades para mantener un código más ordenado 

## DEPLOY
Dejamos el proyecto subido a github pages en https://celizond.github.io/feru-store/#/

## LOCAL
para correrlo local simplemente hay que agregar el .env (se puede basar en el .env.example, de todas maneras en el service está la url por defecto, por ser de manejo nuestro) y luego ejecutar npm install y npm run dev.