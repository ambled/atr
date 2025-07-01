<script lang="ts">
    import type { PageProps } from './$types';
    let {data}: PageProps = $props();
    $inspect(data);
</script>

<p>Wallet: {data.wallet}</p>

{#if data.balances}
<p>ANT: {data.balances.ANT} ${data.values.ANT}</p>
<p>Arb ETH: {data.balances.ARBETH} ${data.values.ARBETH}</p>
<p>Arb USDC: {data.balances.ARBUSDC} ${data.values.ARBUSDC}</p>
<p>Main ETH: {data.balances.MAINETH} ${data.values.MAINETH}</p>
{:else}
    <p>No balance found for this wallet.</p>
{/if}