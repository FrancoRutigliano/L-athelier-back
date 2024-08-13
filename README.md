# WIKI L-ATELIER-PELUQUERIA

En este documento se plasmarán las distintas prácticas que se deberán seguir al trabajar en el proyecto.

## Variables
- Nombres de variables en inglés
- Formato camelCase => userName

## Funciones
- Nombres de las funciones en inglés
- Formato camelCase => getUserName();
- Los mensajes en las funciones de respuesta deberán ser en inglés y se deberá asignar un booleano que represente el estado => `res.json({message:"user not found", details:false});`
- Los mensajes de las funciones de respuesta deberán seguir los status code de HTTP => [documentación: HTTP Status Codes](https://developer.mozilla.org/es/docs/Web/HTTP/Status)

## Commit
- Nombre de commit representativo.
- Contenido del commit con coherencia (En caso de haber modificado 2 archivos independientes, se deberán realizar 2 commits distintos).
- Descripción del commit en inglés.

### Pasos a seguir para subir cambios al repositorio:
- Los cambios se subirán a la rama del repositorio remoto que le pertenece a cada desarrollador.
- Paso seguido se deberá abrir una pull request, desde su rama a la rama dev, agregando como reviewer al desarrollador a cargo del proyecto.
- Finalizando, se deberá apretar el botón "Open Pull Request".

## Entidades
- Las entidades deberán estar estructuradas en módulos.
- Nombre de las entidades en inglés.

## Módulos
- Los módulos deberán ser la representación de una entidad.
- Nombre del módulo en inglés.
- Formato camelCase si es necesario.
- Archivos dentro de módulos:
  - Todos los archivos dentro de los módulos deberán estar escritos en minúscula y en inglés.
  - Los archivos seguirán el formato nombre.tipoarchivo.extensiondelarchivo => `cats.controller.ts`, `cats.module.ts`, `cat.entity.ts`.
