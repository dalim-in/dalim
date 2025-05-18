export default function Footer() {
  return (
    <footer className="before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] relative mt-16 py-8 before:absolute before:-inset-x-full before:top-0 before:h-px md:mt-20">
      <div className="flex justify-between gap-2 max-sm:flex-col max-sm:text-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Dalim UI
        </p>
        <p className="text-muted-foreground text-sm">
          A project by{" "}
          <a
            className="text-foreground decoration-border font-medium underline underline-offset-4 hover:no-underline"
            href="https://x.com/aliimam_in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ali Imam
          </a>{" "}
          .
        </p>
      </div>
    </footer>
  )
}
