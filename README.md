# 22 · El tiempo en Mérida

Crea una **página web que consulte el estado del tiempo en Mérida** con Open-Meteo y muestre una descripción en pantalla. La consulta se realizará al abrir la página, de forma asíncrona y sin recargarla.

## Requisitos

1. Incluye el nombre de la localidad y un titulo para describir el tiempo. Mientras se realiza la consulta, muestra **«Consultando…»**.
2. Al abrir la página, consulta **una única localidad: Mérida**, con las coordenadas **38.91611, −6.34366**.
3. Utiliza `fetch` y una cadena de promesas con `.then()` y `.catch()`. Comprueba `response.ok` antes de convertir la respuesta con `response.json()`.
4. Actualiza el texto del título en base a los códigos, al menos pon los más comunes.
5. Captura los errores de la petición con `.catch()`, registra el problema con `console.error()` y muestra **«No se ha podido consultar el tiempo»** en pantalla.

## Consulta de la API

Endpoint: `https://api.open-meteo.com/v1/forecast`.

| Parámetro | Valor |
| --- | --- |
| `latitude` | `38.91611` |
| `longitude` | `-6.34366` |
| `current` | `weather_code` |
| `timezone` | `Europe/Madrid` |
| `forecast_days` | `1` |

Puedes abrir esta petición directamente en el navegador:

```text
https://api.open-meteo.com/v1/forecast?latitude=38.91611&longitude=-6.34366&current=weather_code&timezone=Europe%2FMadrid&forecast_days=1
```

 Puedes consultar la [documentación oficial](https://open-meteo.com/en/docs) o el [repositorio de Open-Meteo](https://github.com/open-meteo/open-meteo).

 # 22 · Consulta del tiempo

Crea una **aplicación web** que consulte [Open-Meteo](https://github.com/open-meteo/open-meteo) desde el navegador y muestre las condiciones meteorológicas de la localidad seleccionada. Las consultas deben realizarse de forma asíncrona, sin recargar la página.

## Requisitos

1. Incluye un selector con **al menos tres localidades** y sus coordenadas asociadas. Puedes utilizar Mérida, Madrid y Barcelona. Al abrir la web, consulta la primera localidad; al cambiar la selección, actualiza los datos automáticamente.
2. Muestra el **nombre de la localidad, temperatura, humedad relativa, velocidad del viento y fecha y hora de los datos**, con sus unidades.
3. Interpreta `weather_code` según la tabla de la documentación y muestra una **descripción del tiempo y un icono o imagen coherente**. Una recomendación es usar esta librería de iconos: https://github.com/basmilius/meteocons
4. Muestra un estado de **carga**.

Ampliación: Muestra con iconos las próximas 8 horas en función de su código.

## Consulta de la API

Utiliza el endpoint `https://api.open-meteo.com/v1/forecast`. Consulta la [documentación oficial](https://open-meteo.com/en/docs) para construir la petición y entender la respuesta:

| Parámetro | Contenido |
| --- | --- |
| `latitude` y `longitude` | Coordenadas de la localidad seleccionada. |
| `current` | `temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` |
| `timezone` | `auto`, para solicitar la zona horaria correspondiente a la ubicación. |

Revisa los objetos `current` y `current_units` de la respuesta. Las coordenadas de Mérida utilizadas en el ejemplo son **38.91611, −6.34366**.

## Entrega

- Sube este proyecto a tu portfolio para que esté público y accesible.