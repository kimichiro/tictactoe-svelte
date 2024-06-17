<script lang="ts">
    import Container from '$lib/component/Container.svelte'

    /** @type {import('./$types').PageData} */
    export let data
</script>

<Container id="/(csr)/app/weather/+page.svelte">
    <h1>Weather Report Loaded on CSR</h1>
    <p>Weather report at latitude {data.geo.latitude} and {data.geo.longitude}</p>
    <p>Current report at {new Date(data.current.timestamp).toLocaleString()}</p>
    <div>Current Temperature {data.current.temperature} {data.current.temperatureUnit}</div>
    <div>Current Wind Speed {data.current.windSpeed} {data.current.windSpeedUnit}</div>
    <p>Next report at {new Date(data.next.timestamp).toLocaleString()}</p>
    <div>Next Temperature {data.next.temperature} {data.next.temperatureUnit}</div>
    <div>Next Wind Speed {data.next.windSpeed} {data.next.windSpeedUnit}</div>
</Container>
