import { error } from '@sveltejs/kit'

export const ssr = false

/** @type {import('./$types').PageLoad} */
export async function load(event) {
    const response = await event.fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=13.6801&longitude=100.6164&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'
    )

    if (!response.ok) {
        error(response.status, response.statusText)
    }

    const result = await response.json()

    const {
        current,
        current_units,
        latitude,
        longitude,
        hourly: { temperature_2m, wind_speed_10m, time },
        hourly_units
    } = result

    const nextIndex = time.findIndex((t: string) => current.time < t)

    return {
        geo: {
            latitude,
            longitude
        },
        current: {
            temperature: current.temperature_2m,
            temperatureUnit: current_units.temperature_2m,
            windSpeed: current.wind_speed_10m,
            windSpeedUnit: current_units.wind_speed_10m,
            timestamp: `${current.time}Z`
        },
        next:
            nextIndex === -1
                ? {
                      temperature: current.temperature_2m,
                      temperatureUnit: current_units.temperature_2m,
                      windSpeed: current.wind_speed_10m,
                      windSpeedUnit: current_units.wind_speed_10m,
                      timestamp: `${current.time}Z`
                  }
                : {
                      temperature: temperature_2m[nextIndex],
                      temperatureUnit: hourly_units.temperature_2m,
                      windSpeed: wind_speed_10m[nextIndex],
                      windSpeedUnit: hourly_units.wind_speed_10m,
                      timestamp: `${time[nextIndex]}Z`
                  }
    }
}
