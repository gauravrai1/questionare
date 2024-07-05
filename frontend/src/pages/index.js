import Questionaire from "@/components/Questionaire";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-6 bg-gradient-to-b from-purple-400 to-blue-500">
        <h1 className="my-24 text-xl font-bold">Border Pass task</h1>

        <Questionaire  />

        <p className="my-12">Made by Gaurav Rai</p>
    </main>
  );
}
