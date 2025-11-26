import { ReaderIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import BlogCard from "@/sections/blog/_components/blog-card";
import type { PostMeta } from "@/sections/blog/_server/posts";

type BlogSectionProps = {
	posts: PostMeta[];
};

export default function Blog({ posts }: BlogSectionProps) {
	const hasPosts = posts && posts.length > 0;

	return (
		/* biome-ignore lint/correctness/useUniqueElementIds: anchor target appears once */
		<Section
			id="blog"
			title="Latest posts"
			description="Long-form notes on shipping products, solving tricky frontend bugs, and the ideas that influence how I work."
			className="grid grid-cols-1 gap-4 md:grid-cols-2"
			badgeText="Latest posts"
			badgeIcon={<ReaderIcon aria-hidden="true" className="size-3.5" />}
		>
			{hasPosts ? (
				posts.map((post) => <BlogCard key={post.slug} meta={post} />)
			) : (
				<p className="text-sm text-foreground/60">
					No posts yet — add an MDX file in <code>src/content/posts</code> to
					populate this grid.
				</p>
			)}
		</Section>
	);
}
