import type { Metadata } from "next";
import { ItineraryPage } from "@/components/ui/ItineraryPage";
import { getItinerary } from "@/data/itineraries";

export const metadata: Metadata = {
  title: "A hinterland wander",
  description:
    "Three days of the Noosa Shire that isn't the beach. Pomona, Cooran, Cooroy — heritage pubs, gallery railway stations, Mount Cooroora.",
};

export default function HinterlandWanderPage() {
  const data = getItinerary("hinterland-wander");
  if (!data) {
    return (
      <div className="mx-auto max-w-container-6xl px-4 py-12">
        <h1 className="font-display text-display-md">Itinerary not found</h1>
      </div>
    );
  }
  return <ItineraryPage data={data} />;
}