import type { Metadata } from "next";
import { ItineraryPage } from "@/components/ui/ItineraryPage";
import { getItinerary } from "@/data/itineraries";

export const metadata: Metadata = {
  title: "A family-friendly weekend in Noosa",
  description:
    "Three days, two adults and at least one small human. Patrolled beaches, pram-friendly headland walks, river kayaks, and the slow bits covered.",
};

export default function FamilyFunPage() {
  const data = getItinerary("family-fun");
  if (!data) {
    return (
      <div className="mx-auto max-w-container-6xl px-4 py-12">
        <h1 className="font-display text-display-md">Itinerary not found</h1>
      </div>
    );
  }
  return <ItineraryPage data={data} />;
}