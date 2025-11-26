import { GridIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { works } from "@/sections/works/_constants/works";
import WorksCard from "./_components/works-card";

export default function Works() {
	return (
		/* biome-ignore lint/correctness/useUniqueElementIds: anchor target appears once */
		<Section
			id="works"
			title="Featured projects"
			description="A snapshot of the products, experiments, and collaborations I’ve shipped lately—each one mixing thoughtful UX with dependable engineering."
			className="grid grid-cols-1 gap-4"
			badgeText="Featured projects"
			badgeIcon={<GridIcon aria-hidden="true" className="size-3.5" />}
		>
			{works.map((item) => (
				<WorksCard
					key={item.title}
					image={item.image}
					title={item.title}
					description={item.description}
					link={item.link}
				/>
			))}
		</Section>
	);
}
