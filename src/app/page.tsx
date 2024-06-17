import SecondFrame from "@/components/SecondFrame";
import Books from "../components/Books";
import ThirdFrame from "@/components/ThirdFrame";

export default async function Home() {
  return (
    <main className="flex-1 p-4 md:p-6 max-w-[1000px] mx-auto  ">
      <Books />
      <SecondFrame />
      <ThirdFrame />
    </main>
  );
}
