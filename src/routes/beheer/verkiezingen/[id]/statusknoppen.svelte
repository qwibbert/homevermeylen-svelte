<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { superForm } from 'sveltekit-superforms';

	export let status;
	export let verkiezing_id;
	export let kandidaat_id;
	export let verkiezing_actief;

	const form = superForm({ status }, { onChange(event) {
        form.submit();
    }, invalidateAll: false });
	const { form: formData, enhance } = form;
</script>

<form
	action={`/api/verkiezingen/${verkiezing_id}/kandidaten/${kandidaat_id}`}
	method="post"
	aria-disabled={!verkiezing_actief}
	use:enhance
>

		<Form.Fieldset {form} name="status" class="space-y-3">
			<RadioGroup.Root disabled={!verkiezing_actief} bind:value={$formData.status} class="flex flex-col space-y-1">
				<div class="flex items-center space-x-3 space-y-0">
					<Form.Control let:attrs>
						<RadioGroup.Item value="onzichtbaar" {...attrs} />
						<Form.Label class="font-normal">Onzichtbaar</Form.Label>
					</Form.Control>
				</div>
				<div class="flex items-center space-x-3 space-y-0">
					<Form.Control let:attrs>
						<RadioGroup.Item value="zichtbaar" {...attrs} />
						<Form.Label class="font-normal">Zichtbaar</Form.Label>
					</Form.Control>
				</div>
				<div class="flex items-center space-x-3 space-y-0">
					<Form.Control let:attrs>
						<RadioGroup.Item value="voltooid" {...attrs} />
						<Form.Label class="font-normal">Voltooid</Form.Label>
					</Form.Control>
				</div>
				<RadioGroup.Input name="status" />
			</RadioGroup.Root>
			<Form.FieldErrors />
		</Form.Fieldset>

</form>
