import { Mail, MapPin, Phone } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@zovaorganics.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 XXXXX XXXXX',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'India',
  },
]

export function ContactInfo() {
  return (
    <section className="pb-24">
      <div className="container-zova">
        <div className="grid gap-6 md:grid-cols-3">
          {contactInfo.map((item) => (
            <div key={item.title} className="rounded-3xl border bg-background p-8">
              <item.icon className="mb-6 size-5" />

              <h3 className="mb-2 text-lg font-medium">{item.title}</h3>

              <p className="text-muted-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
