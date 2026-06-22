import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-black text-white">
      <Hero />
      <div className="h-screen flex items-center justify-center w-full">
        <h1 className="text-4xl font-bold">End of Scroll</h1>
      </div>
    </main>
  );
}
