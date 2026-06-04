'use client'

import React from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error)

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-6 text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-black text-white rounded-full"
            aria-label="Try again"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
