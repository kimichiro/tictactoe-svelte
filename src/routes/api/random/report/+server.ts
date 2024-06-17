/** @type {import('./$types').RequestHandler} */
export function GET() {
    const current = new Date()
    const next = new Date()
    next.setHours(current.getHours() + 2)
    next.setMinutes(current.getMinutes() + 20)

    const report = {
        geo: {
            latitude: 13.6801,
            longitude: 100.6164
        },
        current: {
            minute: current.getMinutes(),
            minuteUnit: 'min(s)',
            hour: current.getHours(),
            hourUnit: 'hour(s)',
            timestamp: current.toISOString()
        },
        next: {
            minute: next.getMinutes(),
            minuteUnit: 'min(s)',
            hour: next.getHours(),
            hourUnit: 'hour(s)',
            timestamp: next.toISOString()
        }
    }

    const response = new Response(JSON.stringify(report))
    response.headers.set('content-type', 'application/json; charset=utf-8')

    return response
}
