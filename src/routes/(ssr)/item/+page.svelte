<script lang="ts">
    import Container from '$lib/component/Container.svelte'

    /** @type {import('./$types').PageData} */
    export let data
</script>

<Container id="/(ssr)/item/+page.svelte">
    <h1>Navigate with Param Matching</h1>
    <p>Append path with language locale (optional) and json path in url</p>
    <ol>
        {#each data.items as item}
            <li><a href="/item/{item}">{item}</a></li>
        {/each}
    </ol>
</Container>
