export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="flex w-full max-w-2xl flex-col gap-6 px-6 sm:flex-row">
        <a
          className="flex h-16 flex-1 items-center justify-center rounded-full bg-foreground px-8 text-lg font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          href="/kanji_practice"
        >
          Kanji Practice
        </a>

        <a
          className="flex h-16 flex-1 items-center justify-center rounded-full bg-foreground px-8 text-lg font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          href="/kanji_flash_card"
        >
          Kanji Flash Card
        </a>
      </div>
    </main>
  );
}
