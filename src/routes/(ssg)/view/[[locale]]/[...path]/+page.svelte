<script lang="ts">
    import Container from '$lib/component/Container.svelte'

    /** @type {import('./$types').PageData} */
    export let data
</script>

<Container id="/(ssg)/view/[[locale]]/[...path]/+page.svelte">
    <h1>View Raw JSON</h1>
    <p>Key: {data.key}</p>
    <p>{JSON.stringify(data.value)}</p>
</Container>
