import Questionaire from "@/components/Questionaire";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-6 animated-gradient">
        <h1 className="my-16 text-xl font-bold text-white">🇨🇦 Canada Quiz </h1>

        <Questionaire  />

    </main>
  );
}
