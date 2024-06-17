import { error } from '@sveltejs/kit'

export const csr = false

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const response = await event.fetch('http://starter-kit-svelte/api/random/report')

    if (!response.ok) {
        error(response.status, response.statusText)
    }

    return await response.json()
}
