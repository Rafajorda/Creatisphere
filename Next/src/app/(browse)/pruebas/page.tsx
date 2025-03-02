import ModelUploader from "@/components/pruebas/modelUploader";



export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-8 md:p-24">
      <div className="flex w-full max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="w-full md:w-1/2">
       <ModelUploader/>
        </div>
      </div>
    </main>
  )
}

