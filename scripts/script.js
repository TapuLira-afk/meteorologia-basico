const api = "https://api.open-meteo.com/v1/forecast"
const weatherCodesEN = [
    { code: 0, description: "Clear sky", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/clear-day.svg" },
    { code: 1, description: "Mainly clear", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/partly-cloudy-day.svg" },
    { code: 2, description: "Partly cloudy", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/partly-cloudy-day.svg" },
    { code: 3, description: "Overcast", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/overcast.svg" },
    { code: 45, description: "Fog", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/fog.svg" },
    { code: 48, description: "Depositing rime fog", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/fog.svg" },
    { code: 51, description: "Light drizzle", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/drizzle.svg" },
    { code: 53, description: "Moderate drizzle", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/drizzle.svg" },
    { code: 55, description: "Dense drizzle", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/drizzle.svg" },
    { code: 56, description: "Light freezing drizzle", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/sleet.svg" },
    { code: 57, description: "Dense freezing drizzle", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/sleet.svg" },
    { code: 61, description: "Slight rain", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/rain.svg" },
    { code: 63, description: "Moderate rain", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/rain.svg" },
    { code: 65, description: "Heavy rain", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/rain.svg" },
    { code: 66, description: "Light freezing rain", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/sleet.svg" },
    { code: 67, description: "Heavy freezing rain", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/sleet.svg" },
    { code: 71, description: "Slight snowfall", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/snow.svg" },
    { code: 73, description: "Moderate snowfall", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/snow.svg" },
    { code: 75, description: "Heavy snowfall", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/snow.svg" },
    { code: 77, description: "Snow grains", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/snow.svg" },
    { code: 80, description: "Slight rain showers", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/rain.svg" },
    { code: 81, description: "Moderate rain showers", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/rain.svg" },
    { code: 82, description: "Violent rain showers", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/rain.svg" },
    { code: 85, description: "Slight snow showers", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/snow.svg" },
    { code: 86, description: "Heavy snow showers", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/snow.svg" },
    { code: 95, description: "Thunderstorm", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/thunderstorms.svg" },
    { code: 96, description: "Thunderstorm with slight hail", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/thunderstorms-extreme.svg" },
    { code: 97, description: "Heavy thunderstorm", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/thunderstorms-extreme.svg" },
    { code: 99, description: "Thunderstorm with heavy hail", iconUrl: "https://cdn.meteocons.com/latest/svg/fill/thunderstorms-extreme.svg" }
];

const weatherCodesES = [
    { code: 0, description: "Cielo despejado" },
    { code: 1, description: "Mayormente despejado" },
    { code: 2, description: "Parcialmente nublado" },
    { code: 3, description: "Nublado" },
    { code: 45, description: "Niebla" },
    { code: 48, description: "Niebla con escarcha" },
    { code: 51, description: "Llovizna ligera" },
    { code: 53, description: "Llovizna moderada" },
    { code: 55, description: "Llovizna intensa" },
    { code: 56, description: "Llovizna helada ligera" },
    { code: 57, description: "Llovizna helada intensa" },
    { code: 61, description: "Lluvia ligera" },
    { code: 63, description: "Lluvia moderada" },
    { code: 65, description: "Lluvia intensa" },
    { code: 66, description: "Lluvia helada ligera" },
    { code: 67, description: "Lluvia helada intensa" },
    { code: 71, description: "Nevada ligera" },
    { code: 73, description: "Nevada moderada" },
    { code: 75, description: "Nevada intensa" },
    { code: 77, description: "Granos de nieve" },
    { code: 80, description: "Chubascos ligeros" },
    { code: 81, description: "Chubascos moderados" },
    { code: 82, description: "Chubascos violentos" },
    { code: 85, description: "Chubascos de nieve ligeros" },
    { code: 86, description: "Chubascos de nieve intensos" },
    { code: 95, description: "Tormenta" },
    { code: 96, description: "Tormenta con granizo ligero" },
    { code: 97, description: "Tormenta intensa" },
    { code: 99, description: "Tormenta con granizo intenso" }
];
const ciudad = document.querySelector("#ciudad")
const cargando = document.querySelector("#cargando")
const error = document.querySelector("#error")
const current = document.querySelector("#current")
const timezone = document.querySelector("#timezone")
const forecastDays = document.querySelector("#forecast_days")
const selectorCiudad = document.querySelector("#selector-ciudad")
const tituloTiempo = document.querySelector("#titulo-tiempo")
const humedad = document.querySelector("#humedad")
const viento = document.querySelector("#viento")
const semana = document.querySelector("#semana")

async function llamarApi(latitude, longitude, weather_code, timezone, forecast_days) {
    onOffElementCargando(false)
    const apiConsulta = `${api}?latitude=${latitude}&longitude=${longitude}&current=${weather_code}&timezone=${timezone}&forecast_days=${forecast_days}`
    console.log(apiConsulta)
    try {
        const response = await fetch(apiConsulta);

        if (!response.ok) {
            const error_ = new Error(response.statusText);
            error_.status = response.status
            throw error_
        }

        const data = await response.json()

        return data
    } catch (error_) {
        console.error('Hubo un problema con la solicitud:', error_);
        onOffElementError(false, error_)
    } finally {
        onOffElementCargando(true)
    }
}

async function llamarApiDaily(latitude, longitude, weather_code, timezone, forecast_days) {
    onOffElementCargando(false)
    const apiConsulta = `${api}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=${timezone}&forecast_days=${forecast_days}`
    console.log(apiConsulta)
    try {
        const response = await fetch(apiConsulta);

        if (!response.ok) {
            const error_ = new Error(response.statusText);
            error_.status = response.status
            throw error_
        }

        const data = await response.json()

        return data
    } catch (error_) {
        console.error('Hubo un problema con la solicitud:', error_);
        onOffElementError(false, error_)
    } finally {
        onOffElementCargando(true)
    }
}

function onOffElementCargando(yesno) {
    cargando.hidden = yesno;
}

function onOffElementError(yesno, error) {
    error.hidden = yesno;

    if (!yesno) {
        error.textContent = error
    } else {
        error.textContent = ""
    }
}

window.addEventListener('load', () => {
    const primeraOpcion = selectorCiudad.options[0]
    ciudad.textContent = primeraOpcion.text
    let latitud = primeraOpcion.dataset.lat;
    let logintud = primeraOpcion.dataset.lon;
    
    void llamarApi(latitud,
        logintud,
        current.textContent.trim(),
        timezone.textContent.trim(),
        forecastDays.textContent.trim())
        .then(data => {
            tituloTiempo.textContent = traducirWeatherCode(data.current.weather_code)
            humedad.textContent = "Humedad: " + data.current.relative_humidity_2m + data.current_units.relative_humidity_2m
            viento.textContent = "Viento: " + data.current.wind_speed_10m + data.current_units.wind_speed_10m
        });

    let days = llamarApiDaily(latitud,
        logintud,
        current.textContent.trim(),
        timezone.textContent.trim(),
        forecastDays.textContent.trim())

    

    semana.querySelectorAll(".icon").forEach(element => {
        console.log(days)

        void days.then(data => {
            data.daily.weather_code.forEach(dia => {
                console.log(dia)
                let tiempo = weatherCodesEN.find(w => w.code == dia)
                element.src = tiempo.iconUrl
                element.setAttribute("alt", tiempo.description)
                console.log(element)
            });
        })
    });
});



function traducirWeatherCode(weather_code) {
    const code = weatherCodesEN.filter(w => w.description === weather_code)
    const tiempo = weatherCodesES.find(w => w.code == code)

    return tiempo.description
}