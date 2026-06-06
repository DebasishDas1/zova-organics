import Loading from '@/components/ui/Loading'

export default function LoadingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <Loading />

        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-foreground">Preparing your experience</p>
          <p className="text-sm text-muted-foreground">
            Loading sustainable products and sourcing insights.
          </p>
        </div>
      </div>
    </main>
  )
}
