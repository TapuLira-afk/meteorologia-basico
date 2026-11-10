const api = "https://api.open-meteo.com/v1/forecast"
const weatherCodesEN = [
    { code: 0, description: "Clear sky" },
    { code: 1, description: "Mainly clear" },
    { code: 2, description: "Partly cloudy" },
    { code: 3, description: "Overcast" },
    { code: 45, description: "Fog" },
    { code: 48, description: "Depositing rime fog" },
    { code: 51, description: "Light drizzle" },
    { code: 53, description: "Moderate drizzle" },
    { code: 55, description: "Dense drizzle" },
    { code: 56, description: "Light freezing drizzle" },
    { code: 57, description: "Dense freezing drizzle" },
    { code: 61, description: "Slight rain" },
    { code: 63, description: "Moderate rain" },
    { code: 65, description: "Heavy rain" },
    { code: 66, description: "Light freezing rain" },
    { code: 67, description: "Heavy freezing rain" },
    { code: 71, description: "Slight snowfall" },
    { code: 73, description: "Moderate snowfall" },
    { code: 75, description: "Heavy snowfall" },
    { code: 77, description: "Snow grains" },
    { code: 80, description: "Slight rain showers" },
    { code: 81, description: "Moderate rain showers" },
    { code: 82, description: "Violent rain showers" },
    { code: 85, description: "Slight snow showers" },
    { code: 86, description: "Heavy snow showers" },
    { code: 95, description: "Thunderstorm" },
    { code: 96, description: "Thunderstorm with slight hail" },
    { code: 97, description: "Heavy thunderstorm" },
    { code: 99, description: "Thunderstorm with heavy hail" }
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
const cargando = document.querySelector("#cargando")
const tiempo = document.querySelector("#titulo-tiempo")
const latitude = document.querySelector("#latitude")
const error = document.querySelector("#error")
const longitude = document.querySelector("#longitude")
const current = document.querySelector("#current")
const timezone = document.querySelector("#timezone")
const forecastDays = document.querySelector("#forecast_days")

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
    console.log()
    void llamarApi(latitude.textContent.trim(), longitude.textContent.trim(), current.textContent.trim(), timezone.textContent.trim(), forecastDays.textContent.trim())
        .then(data => tiempo.textContent = traducirWeatherCode(data.current.weather_code));
});

function traducirWeatherCode(weather_code) {
    const code = weatherCodesEN.filter(w => w.description === weather_code)
    const tiempo = weatherCodesES.find(w => w.code == code)

    return tiempo.description
}


