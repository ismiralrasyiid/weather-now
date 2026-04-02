import { City } from "@/domains/location";

export default async function Content({ city }: { city: City }) {
  await new Promise((r) => setTimeout(r, 4000));

  return (
    <div className="absolute bottom-0 p-4 text-white">
      <h3 className="text-lg font-semibold">{city.name}</h3>

      <div className="h-12">
        <p className="text-xl font-bold">25°C ☀️</p>

        <p className="text-sm text-white/80">
          Feels like 30°C — hotter than usual
        </p>
      </div>
    </div>
  );
}
