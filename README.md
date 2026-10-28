# Práctica 6: Base de Datos Documentales

API REST desarrollada con Node.js, Express y MongoDB Atlas para administrar sensores y sus mediciones.

## Base de datos

- Base de datos: tutorial10
- Colección: sensores
- Cluster: Cluster0

## Instalación y ejecución

~~~bash
npm install
npm start
~~~

El servidor escucha en el puerto 3000.

## Endpoints

| Método | Ruta | Acción |
| --- | --- | --- |
| GET | /sensores | Lista todos los sensores |
| POST | /sensores | Crea un sensor con el JSON enviado en el cuerpo |
| GET | /sensores/:sensorId | Consulta un sensor por su ObjectId |
| POST | /sensores/:sensorId/mediciones | Agrega una medición al sensor |

## Documento registrado en Atlas

El documento de la práctica quedó con el ObjectId 6ae2022a33a25827dd6979da y el nombre “Sensor de Temperatura - UAO - InfoLab”. La medición registrada es:

~~~json
{
  "momento": "2020-10-23T20:51:39.720Z",
  "valor": 27.8,
  "unidad": "°C"
}
~~~
Se adjunta tambien una imagen de los resultados obtenidos en desde MongoDB de Documento sensor con la medición.
La URI de conexión usada para esta práctica está dentro de index.js, junto con el código de la API.
