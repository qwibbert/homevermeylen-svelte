<script lang="ts">
	import { pushState } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Ellipsis } from 'lucide-svelte';
	import type { VerslagenRecord } from '../../../../types/pocketbase-types';

	let { verslag }: { verslag: VerslagenRecord } = $props();

	function updateGeselecteerdVerslag(verslag: VerslagenRecord) {
		pushState('', { verslag });
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<span class="sr-only">Open menu</span>
				<Ellipsis />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Acties</DropdownMenu.GroupHeading>
			<DropdownMenu.Item onclick={() => updateGeselecteerdVerslag(verslag)}
				>Bewerken</DropdownMenu.Item
			>
			<DropdownMenu.Item onclick={() => pushState('', { verwijder_verslag: verslag.id })}
				>Verwijder</DropdownMenu.Item
			>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
