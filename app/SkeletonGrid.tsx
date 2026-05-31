function SkeletonCard({ delay }: { delay: number }) {
	return (
		<div
			className="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg shadow-lg overflow-hidden"
			style={{ "--delay": `${delay}ms` } as React.CSSProperties}
		>
			<div className="skeleton h-56 w-full" />

			<div className="flex-1 flex flex-col p-5">
				<div className="space-y-2 mb-3">
					<div className="skeleton h-4 w-full rounded" />
					<div className="skeleton h-4 w-3/4 rounded" />
				</div>

				<div className="flex-1 space-y-2">
					<div className="skeleton h-3 w-full rounded" />
					<div className="skeleton h-3 w-full rounded" />
					<div className="skeleton h-3 w-2/3 rounded" />
				</div>

				<div className="flex justify-end space-x-2 pt-5">
					<div className="skeleton h-3 w-14 rounded" />
					<div className="skeleton h-3 w-20 rounded" />
				</div>
			</div>

			<div className="skeleton h-10 rounded-b-lg" />
		</div>
	);
}

export function SkeletonGrid() {
	return (
		<main
			role="status"
			aria-label="Loading news articles"
			aria-busy="true"
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-10"
		>
			{Array.from({ length: 6 }).map((_, i) => (
				<SkeletonCard key={i} delay={i * 150} />
			))}
		</main>
	);
}
