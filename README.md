# Workplace Station  <img src="project\design\logo\isotipo-workplace-station.png" alt="imagotipo workplace station" width="25" /> 

> _Este repositorio corresponde al proyecto integrador del **grupo** :8ball: del curso de_ [desarrollo Web Full-Stack en Node](https://www.digitalhouse.com/ar/curso/programacion-web-full-stack) _de la organización educativa_  [Digital House](https://www.digitalhouse.com/ar).

En Workplace Station vas a poder encontrar todos los productos necesarios para armar tu espacio de trabajo. Estos productos pueden ser desde escritorios, sillas ergonómicas, periféricos para PC, hasta accesorios de todo tipo. 

Este sitio esta dirigido a todas aquellas personas que pasen mucho tiempo trabajando, jugando, estudiando, diseñando, etc... desde sus hogares y que busquen el mayor confort posible. 

## Descripción de los integrantes:

- ### Eduardo Brahim Alí: 

Soy un desarrollador iniciante con algunos conocimientos en diseño web, aplicaciones de escritorio en Java y desarrollo en Android. Estoy buscando constanstemente seguir expandiendo mis conocimientos en distintas áreas del desarrollo de software.

:octocat: [@Brahim006](https://github.com/Brahim006)

- ### Sebastián Rellihan: 

Soy un joven curioso y amante de la tecnología que busca formarse como desarrollador. Mi objetivo es desafiarme constantemente y mantener un aprendizaje constante que me permita ampliar mis conocimientos. Cuento con conocimiento previo en desarrollo web front-end, experiencia en diseño y producción audiovisual.

:octocat: [@sebastianRellihan](https://github.com/sebastianRellihan)

## Estructura de la base de datos
Este sitio opera con una base de datos relacional MySQL. Todos los detalles se encuentran en la carpeta [database-model](https://github.com/sebastianRellihan/grupo_8_workplaceStation/tree/master/project/database-model) que contiene:
- El [DER](https://github.com/sebastianRellihan/grupo_8_workplaceStation/blob/master/project/database-model/DER_Workplace_Station.pdf) (diagrama entidad-relación) de su estructura en formato **PDF**.
- Una sentencia [structure.sql](https://github.com/sebastianRellihan/grupo_8_workplaceStation/blob/master/project/database-model/structure.sql) para poder generarla.
- Otra sentencia [data.sql](https://github.com/sebastianRellihan/grupo_8_workplaceStation/blob/master/project/database-model/data.sql) para poder poblarla con datos coherentes.

## Instrucciones de uso

1. Clonar el repositorio que contiene el proyecto desde la terminal, ubicado en el directorio deseado, ejecutando el comando:
> git clone https://github.com/sebastianRellihan/grupo_8_workplaceStation
2. Ubicarse dentro de la carpeta site del proyecto, en la consola, y ejecutar el siguiente comando para instalar las dependencias del proyecto:
> npm i o npm install
3. Contar con un servidor de MySQL que esté corriendo en el puerto 3306: 
> Ejemplo: XAMPP o MAMP
4. Contar con un programa para la administración de bases de datos:
> Ejemplo: MySQL Workbench
5. Ejecutar las sentencias, en el programa de administración de bases de datos, de SQL que crearán la base de datos, las tablas, sus relaciones y tipos de datos:
> [structure.sql](https://github.com/sebastianRellihan/grupo_8_workplaceStation/blob/master/project/database-model/structure.sql) para crear la base de datos
6. Ejecutar las sentencias, en el programa de administración de bases de datos, de SQL que permitirá poblar la base con datos:
> [data.sql](https://github.com/sebastianRellihan/grupo_8_workplaceStation/blob/master/project/database-model/data.sql)
7. Ubicarse dentro de la carpeta site del proyecto, en la consola, y ejecutar el siguiente comando para ejecutar la aplicación:
> npm run startdev
8. Desde el navegador acceder al puerto 3000 en donde se encuentra corriendo la aplicación:
> http://localhost:3000/
9. Podés navegar como visita, crear tu propio usuario o acceder desde los que poblaste en la taba previamente con la sentencia de SQL [data.sql](https://github.com/sebastianRellihan/grupo_8_workplaceStation/blob/master/project/database-model/data.sql)

Usuario | Contraseña | Acceso
--------|------------|-------
s@g.com o sebas0808 | sebaseba | Admin
d@g.com o estebi | sebaseba | Regular

## Sítios de referencia:

> _Esta es una lista de páginas web que sirve como referencia para nuestro diseño, ya sea por su estilo visual y/o funcionalidades._


Sitio | Elegido en base a:
------|-------------------
[MWLab](https://mwelab.net/) | Principalmente por su diseño de barra de navegacion, tanto en vista móvil como desde un ordenador, por el concepto de ser un work station y su público objetivo.
[Ergosit](https://ergosit.com.ar/) | Por su estética, por los productos que ofrecen, por el publico al que se dirigen y por el movimiento en el que se oculta la barra de navegación al ir para abajo.
[Tempo](www.tempo.com.ar/categoria-producto/tipo-de-producto/puestos-de-trabajo/) | Por su diseño, público objetivo y presentación de los productos ofrecidos.
[DellaCasa](https://dellacasaonline.com/home-office) | Por la distribución de los productos ofrecidos y la funcionalidad para intercambiar entre vistas de tipo "lista" y tipo "grilla".
[Woodmarket](https://woodmarket.com.ar/) | Por su estética y diseño, por las transiciones que tiene, por diseño y presentación del carrito de compras.

## ¿Querés seguir nuestro proyecto?
[Tablero de trello](https://trello.com/b/IjkYT0Zy/grupo8)
