<script lang="ts">
    import { page } from '$app/stores'

    import Container from '$lib/component/Container.svelte'
</script>

<Container id="/+error.svelte">
    <h1>ERROR {$page.status}</h1>
    <p>{$page.error?.message}</p>
</Container>
