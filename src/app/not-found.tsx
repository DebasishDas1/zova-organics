import Link from 'next/link'
import { Geist } from 'next/font/google'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export default function NotFound() {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-xl text-center">
          <Image
            src="/404 Error.svg"
            alt="Page Not Found"
            width={400}
            height={300}
            className="mx-auto mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">Let's get you back on track.</h1>
          <p className="mb-6 text-muted-foreground">
            The page you're looking for isn't available. Explore our collection of sustainable
            products
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:opacity-90"
            >
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center rounded-full border border-[#E7E4DB] bg-white px-6 py-3 text-sm font-medium text-[#121212] transition-all hover:bg-[#F9F8F5]"
            >
              Explore Products
            </Link>
          </div>
          <div className="mt-16 border-t border-[#E7E4DB] pt-6 text-sm text-[#6B6B6B]">
            Zova Organics • Sustainable Products for Global Markets
          </div>
        </div>
      </body>
    </html>
  )
}
