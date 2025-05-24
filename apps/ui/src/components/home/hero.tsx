import SearchButton from "./search-button"

export function Hero() {
  return (
    <div className="flex mb-10 flex-col items-center">
      <main className="relative my-10 w-full overflow-hidden px-6">
        <h1 className="mb-3 text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">
          UI Experience
        </h1>
        <p className="text-primary/60 px-6 text-center text-xs md:text-sm lg:text-lg">
          Unleashing creativity through bold visuals, seamless interfaces, and
          limitless possibilities.
        </p>
      </main> 
      <SearchButton />
    </div>
  )
}
