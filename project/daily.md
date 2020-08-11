# Daily

## Resumen (desde el 04/08)
> Sebas
● Qué se hizo:  Implementación del sistema de ruteo y sus controladores para las vistas de productos (products, cart y detail). Implementación de los template engines y separación de las vistas en carpetas. Maquetado de los forms create y edit. Implementación del sistema de ruteo, y su controlador para las dos vistas. Logica en el controlador para añadir un nuevo producto al json.
● Que impedimentos se encontraron:  Al añadir la carpeta src al proyecto no podía renderizar las vistas para mostrarlas porque únicamente le había aclarado a express cual era el motor de templates que utilizabamos, pero no donde se encontraba la carpeta views. Dificultades generales al implementar rutas y lógica a metodos del controlador.

> Brahim
● Qué se hizo: Implementé la estructura MVC para las rutas de tipo "main" (genéricas) y users (para la gestión de la sesión de usuarios), con sus enrutadores y controladores. Modularicé algunas secciones parciales de los HTML que son comunes (header, footer, etc..). Dinamicé las vistas de productos, detalle del producto y el carrito de compras para que estas muestren los productos de forma dinámica. Revicé y corregí algunos detalles del estilo de todas las vistas, tanto para sus versiones móviles, tablet y escritorio.
● Que impedimentos Tuve: Algunos errores en las rutas absolutas que salvé mediante el uso del módulo PATH.
Determinar qué secciones de los HTML convenía modularizar. El no conocer el modelo de datos que vamos a usar me dificultó la carga de datos dinámica de productos, pude salvar eso apoyándome en un archivo JSON que simula el modelo de datos.