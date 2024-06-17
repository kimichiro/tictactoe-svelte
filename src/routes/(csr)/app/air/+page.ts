import { error } from '@sveltejs/kit'

export const ssr = false

/** @type {import('./$types').PageLoad} */
export async function load(event) {
    const response = await event.fetch(
        'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=13.6801&longitude=100.6164&current=pm10,pm2_5&hourly=pm10,pm2_5'
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
        hourly: { pm10, pm2_5, time },
        hourly_units
    } = result

    const nextIndex = time.findIndex((t: string) => current.time < t)

    return {
        geo: {
            latitude,
            longitude
        },
        current: {
            pm10: current.pm10,
            pm10Unit: current_units.pm10,
            pm2_5: current.pm2_5,
            pm2_5Unit: current_units.pm2_5,
            timestamp: `${current.time}Z`
        },
        next:
            nextIndex === -1
                ? {
                      pm10: current.pm10,
                      pm10Unit: current_units.pm10,
                      pm2_5: current.pm2_5,
                      pm2_5Unit: current_units.pm2_5,
                      timestamp: `${current.time}Z`
                  }
                : {
                      pm10: pm10[nextIndex],
                      pm10Unit: hourly_units.pm10,
                      pm2_5: pm2_5[nextIndex],
                      pm2_5Unit: hourly_units.pm2_5,
                      timestamp: `${time[nextIndex]}Z`
                  }
    }
}
