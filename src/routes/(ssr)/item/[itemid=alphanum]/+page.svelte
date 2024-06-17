<script lang="ts">
    import { page } from '$app/stores'

    import Container from '$lib/component/Container.svelte'
</script>

<Container id="/(ssr)/item/[itemid=alphanum]/+page.svelte">
    <h1>Param Matching with Alphanumeric</h1>
    <p>Append path with language locale (optional) and json path in url</p>
    <h2>Item #{$page.params.itemid}</h2>
</Container>
