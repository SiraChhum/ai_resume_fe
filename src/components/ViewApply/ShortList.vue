
<template>
	<div class="space-y-4">
		<div
			v-for="app in shortlist"
			:key="app.email"
			@click="select(app)"
			class="cursor-pointer flex items-center gap-4 rounded-[18px] border border-slate-200 bg-white p-4 transition hover:shadow-lg"
		>
			<img :src="app.avatar" alt="avatar" class="h-12 w-12 rounded-full object-cover" />
			<div class="flex-1">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-base font-semibold text-slate-900">{{ app.name }}</p>
						<p class="text-sm text-slate-500">{{ app.title }} • {{ app.location }}</p>
					</div>
					<div class="text-right">
						<div class="inline-flex items-center gap-2">
							<span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{{ app.score }} Score</span>
						</div>
						<p class="text-sm text-slate-500">Interviewed {{ app.interviewedAgo }}</p>
					</div>
				</div>

				<div class="mt-3 h-2 w-full rounded-full bg-slate-100">
					<div :style="{ width: app.score + '%' }" class="h-2 rounded-full bg-emerald-400"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const shortlist = [
	{
		name: 'Julian Thorne',
		email: 'julian.thorne@example.com',
		title: 'Senior Product Designer',
		location: 'Berlin, Germany',
		avatar: 'https://i.pravatar.cc/150?img=12',
		score: 92,
		interviewedAgo: '2d ago',
	},
	{
		name: 'Elena Rodriguez',
		email: 'elena.rodriguez@example.com',
		title: 'Senior UX Researcher',
		location: 'Remote',
		avatar: 'https://i.pravatar.cc/150?img=13',
		score: 87,
		interviewedAgo: '4d ago',
	},
	{
		name: 'Mark Stevenson',
		email: 'mark.stevenson@example.com',
		title: 'Product Designer',
		location: 'San Francisco, CA',
		avatar: 'https://i.pravatar.cc/150?img=14',
		score: 84,
		interviewedAgo: '5d ago',
	},
	{
		name: 'Sarah Jenkins',
		email: 'sarah.jenkins@example.com',
		title: 'UI Designer',
		location: 'New York, NY',
		avatar: 'https://i.pravatar.cc/150?img=15',
		score: 81,
		interviewedAgo: '1w ago',
	},
]

const emit = defineEmits(['select'])

function select(app) {
	emit('select', app)
}
</script>

<style scoped></style>
