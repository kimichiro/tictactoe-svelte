/** @type {import('@sveltejs/kit').HandleClientError} */
export async function handleError({ status, message }) {
    const errorId = crypto.randomUUID()

    return { message: `[/hooks.client.ts|${errorId}] Error ${status} - ${message}` }
}
