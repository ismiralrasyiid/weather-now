import Headline from "@/components/feature/headline";
import { PopularCities } from "@/components/feature/popular-cities";
import { Searchbar } from "@/components/feature/searchbar";

export default function Home() {
  return (
    <>
      <main>
        <Headline className="mt-9.5 md:mt-14.5">
          How&#39;s the sky looking today?
        </Headline>
        <Searchbar className="mt-8.5 md:mt-13.5" />
        <PopularCities className="mt-6.5" />
      </main>
    </>
  );
}
