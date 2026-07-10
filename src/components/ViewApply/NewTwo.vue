<template>
	<div class="space-y-4">
		<div
			v-for="application in newApplications"
			:key="application.email"
			@click="select(application.email)"
			class="cursor-pointer flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 transition hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
		>
			<div class="flex items-center gap-4">
				<img :src="application.avatar" alt="candidate" class="h-14 w-14 rounded-2xl object-cover" />
				<div>
					<div class="flex items-center gap-2">
						<p class="text-base font-semibold text-slate-900">{{ application.name }}</p>
						<span v-if="application.tag" class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{{ application.tag }}</span>
					</div>
					<p class="text-sm text-slate-500">{{ application.email }}</p>
					<p class="text-sm text-slate-500">{{ application.location }}</p>
				</div>
			</div>

			<div class="flex flex-col items-start gap-2 text-sm text-slate-500 sm:items-end">
				<span class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">New</span>
				<p class="font-medium text-slate-900">Applied {{ application.date }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const applications = [
	{
		name: 'Sophie Nguyen',
		email: 'sophie.nguyen@example.com',
		location: 'Phnom Penh, Cambodia',
		date: 'May 29, 2024',
		tag: 'New',
		avatar: 'https://i.pravatar.cc/150?img=32',
		title: 'Senior UI Designer',
		summary:
			'Seasoned UI Designer with over 7 years of experience creating intuitive digital products. Expert in Figma, design systems, and user-centric methodologies.',
		skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
	},
	{
		name: 'Dara Sok',
		email: 'dara.sok@example.com',
		location: 'Siem Reap, Cambodia',
		date: 'May 29, 2024',
		tag: 'New',
		avatar: 'https://i.pravatar.cc/150?img=31',
		title: 'UI Designer',
		summary: 'Product-minded designer with a focus on usable and accessible interfaces.',
		skills: ['Figma', 'Illustrator'],
	},
]

	const newApplications = computed(() => applications.filter((a) => a.tag === 'New'))

	const emit = defineEmits(['select'])

	function select(application) {
		emit('select', application)
	}
</script>

<style scoped></style>
