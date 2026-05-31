export const metadata = {
  title: 'Insights - Zova Organics',
  description:
    'Read the latest insights on sustainable sourcing, textile trends, and responsible manufacturing.',
}

export default async function BlogsPage() {
  return (
    <section className="container-zova py-24">
      <div className="max-w-4xl">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Insights</span>
        <h1 className="mt-6 text-4xl font-semibold">Latest updates from Zova Organics</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Explore news, sourcing advice, and industry insights to support sustainable supply chains.
        </p>
      </div>
    </section>
  )
}
