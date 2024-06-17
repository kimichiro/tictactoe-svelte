export const csr = false

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    event.setHeaders({
        'x-ssr-header': '+layout.server.ts'
    })

    return {}
}
