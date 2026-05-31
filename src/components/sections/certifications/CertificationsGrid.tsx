const certifications = [
  {
    name: 'GOTS',
    description: 'Global Organic Textile Standard for organic fibers and responsible processing.',
  },
  {
    name: 'OEKO-TEX',
    description: 'Independent testing for harmful substances in textile products.',
  },
  {
    name: 'ISO 9001',
    description: 'Quality management systems focused on consistency and continuous improvement.',
  },
]

export function CertificationsGrid() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-zova">
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Standards
          </span>

          <h2 className="mt-4">Certifications we support and work with.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {certifications.map((item) => (
            <div key={item.name} className="rounded-3xl bg-background p-8">
              <h3 className="text-2xl">{item.name}</h3>

              <p className="mt-4 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
