
import SearchHome from "@/components/Home/SearchHome"
import SecondScene3d from "@/components/Home/SecondScene3d"

export default function Home() {
  return (
  <main className="flex min-h-screen items-center justify-center p-4 sm:p-8 md:p-24">
    <div className="flex w-full max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
    <div className="w-full md:w-2/3 flex flex-col items-center justify-center">
      <img src="/assets/logo/logo.png" alt="logo" className="w-full h-auto mb-4" />
      <div className="w-3/4 mt-4">
      <SearchHome />
      </div>
    </div>
    <div className="w-full h-[300px] md:w-1/2 md:h-[400px]">
      <SecondScene3d />
    </div>
    </div>
  </main>
  )
}

