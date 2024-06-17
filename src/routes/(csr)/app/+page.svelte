<script lang="ts">
    import Container from '$lib/component/Container.svelte'
</script>

<Container id="/(csr)/app/+page.svelte">
    <h1>App Home</h1>
    <li><a href="/app/weather">Weather Forecast API</a></li>
    <li><a href="/app/air">Air Quality Forecast API</a></li>
    <li><a href="/app/sample">Sample API on SSR</a></li>
    <li><a href="/app/force-error">Force Error on CSR</a></li>
    <li><a href="/force-error">Force Error on SSR</a></li>
</Container>
