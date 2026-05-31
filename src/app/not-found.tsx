import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        <p className="mb-6 text-muted-foreground">We couldn't find the page you're looking for.</p>
        <Link href="/" className="px-6 py-3 bg-black text-white rounded-full">
          Go home
        </Link>
      </div>
    </div>
  )
}
