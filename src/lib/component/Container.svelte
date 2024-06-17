<script lang="ts">
    export let expanded: boolean = false
</script>

<div {...$$restProps} class="container" class:expanded>
    <slot />
</div>

<style>
    .container {
        border: 1px solid lightgray;
        border-radius: 8px;

        padding: 16px 8px 8px 8px;
    }

    ::before {
        content: '[' attr(id) ']';
        position: absolute;
        transform: translateY(-24px);
        background: white;
        padding: 0 4px;
        font-family: monospace;
    }

    .container.expanded {
        min-height: calc(100vh - (2 * 8px) - (3 * 8px) - (2 * 1px));
        min-width: calc(100vw - (2 * 8px) - (2 * 8px) - (2 * 1px));
    }
</style>
