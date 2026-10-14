import type { Metadata } from "next";
import { ItineraryPage } from "@/components/ui/ItineraryPage";
import { getItinerary } from "@/data/itineraries";

export const metadata: Metadata = {
  title: "A beach-lover's long weekend",
  description:
    "Three days for the surf-curious and the swim-serious. First Bay is the learner break; Noosa Main is the long right-hander; Alexandria Bay is the walk-to.",
};

export default function BeachLoverPage() {
  const data = getItinerary("beach-lover");
  if (!data) {
    return (
      <div className="mx-auto max-w-container-6xl px-4 py-12">
        <h1 className="font-display text-display-md">Itinerary not found</h1>
      </div>
    );
  }
  return <ItineraryPage data={data} />;
}