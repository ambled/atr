<script lang="ts">
    import type { PageProps } from './$types';
    let {data}: PageProps = $props();
    $inspect(data);
</script>

<h1>{data.message}</h1>
<p>Wallet: {data.wallet}</p>

{#if data.balances}
<p>ANT: {data.balances.ANT}</p>
<p>Arb ETH: {data.balances.ARBETH}</p>
{:else}
    <p>No balance found for this wallet.</p>
{/if}