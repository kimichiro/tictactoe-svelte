import { getItemIds } from '$lib/server/items'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return { items: getItemIds() }
}
