<script lang="ts">
    import Container from '$lib/component/Container.svelte'

    /** @type {import('./$types').PageData} */
    export let data
</script>

<Container id="/(ssr)/app/air/+page.svelte">
    <h1>Air Quality Report Loaded on CSR</h1>
    <p>Air quality report at latitude {data.geo.latitude} and {data.geo.longitude}</p>
    <p>Current report at {new Date(data.current.timestamp).toLocaleString()}</p>
    <div>Current PM10 {data.current.pm10} {data.current.pm10Unit}</div>
    <div>Current PM2.5 {data.current.pm2_5} {data.current.pm2_5Unit}</div>
    <p>Next report at {new Date(data.next.timestamp).toLocaleString()}</p>
    <div>Next PM10 {data.next.pm10} {data.next.pm10Unit}</div>
    <div>Next PM2.5 {data.next.pm2_5} {data.next.pm2_5Unit}</div>
</Container>
