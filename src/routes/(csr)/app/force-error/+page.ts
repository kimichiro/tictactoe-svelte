export const ssr = false

/** @type {import('./$types').PageLoad} */
export async function load() {
    throw new Error(`force throwing unexpected error on client side page (not using 'error()')`)
}
