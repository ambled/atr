<script lang="ts">
    let data = $props();
    $inspect(data);
</script>

<h1>{data.data.message}</h1>
<p>Wallet: {data.data.wallet}</p>

{#if data.data.balances}
<p>ANT: {data.data.balances.ANT}</p>
<p>Arb ETH: {data.data.balances.ARBETH}</p>
{:else}
    <p>No balance found for this wallet.</p>
{/if}