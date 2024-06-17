<script lang="ts">
    import Container from '$lib/component/Container.svelte'

    /** @type {import('./$types').PageData} */
    export let data
</script>

<Container id="/(ssr)/app/sample/+page.svelte">
    <h1>Sample Report Loaded on SSR</h1>
    <p>Sample report at latitude {data.geo.latitude} and {data.geo.longitude}</p>
    <p>Current report at {new Date(data.current.timestamp).toLocaleString()}</p>
    <div>Current Minute {data.current.minute} {data.current.minuteUnit}</div>
    <div>Current Hour {data.current.hour} {data.current.hourUnit}</div>
    <p>Next report at {new Date(data.next.timestamp).toLocaleString()}</p>
    <div>Next Minute {data.next.minute} {data.next.minuteUnit}</div>
    <div>Next Hour {data.next.hour} {data.next.hourUnit}</div>
</Container>
