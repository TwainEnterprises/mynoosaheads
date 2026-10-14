import type { Metadata } from "next";
import { ItineraryPage } from "@/components/ui/ItineraryPage";
import { getItinerary } from "@/data/itineraries";

export const metadata: Metadata = {
  title: "A foodie's long weekend",
  description:
    "Three days for the table. Hastings Street fine-dining, Noosa Junction brunch, Gympie Terrace riverfront value, Sunshine Beach village locals.",
};

export default function FoodiePage() {
  const data = getItinerary("foodie");
  if (!data) {
    return (
      <div className="mx-auto max-w-container-6xl px-4 py-12">
        <h1 className="font-display text-display-md">Itinerary not found</h1>
      </div>
    );
  }
  return <ItineraryPage data={data} />;
}