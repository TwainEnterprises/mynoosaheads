/**
 * Itinerary data — v6.3 (MSN-2964) Phase D.
 *
 * 4 themed 3-day itineraries, each a content page at /itineraries/[slug].
 * Content is editorial register, sourced, anonymised.
 *
 * Per the v6.3 spec: 4 pages, each 600-1200 words, with hero + day-by-day
 * breakdown + map (inline SVG of Noosa with route overlay) + photo
 * gallery (reuses v6.2 photos via HOMEPAGE_SECTIONS) + booking CTAs.
 *
 * Photo selection reuses the v6.2 Commons photos (verified, all
 * location-specific, 4-test passed per Albert's manifest).
 */

export type ItineraryDay = {
  /** Day number / heading (e.g. "Day 1 — Coast and coffee"). */
  title: string;
  /** Subhead — short intro for the day. */
  intro: string;
  /** Editorial bullets (3-6 per day). */
  bullets: { time: string; text: string }[];
};

export type Itinerary = {
  slug: string;
  title: string;
  /** Short eyebrow above the title. */
  eyebrow: string;
  /** Hero image + meta. */
  hero: {
    src: string;
    alt: string;
    width: number;
    height: number;
    credit?: string;
  };
  /** Editorial intro paragraph (~80-120 words). */
  intro: string;
  /** 3 days of content. */
  days: ItineraryDay[];
  /** Gallery (3-5 photo Commons URLs from HOMEPAGE_SECTIONS). */
  gallery: { src: string; alt: string; caption: string }[];
  /** Booking CTAs at the bottom — internal cross-links. */
  bookingCtas: { label: string; href: string; description: string }[];
  /** Cross-section tags for content tagging. */
  tags: string[];
};

export const ITINERARIES: readonly Itinerary[] = [
  {
    slug: "family-fun",
    title: "A family-friendly weekend in Noosa",
    eyebrow: "3 DAYS · WITH KIDS",
    hero: {
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Noosa_Heads_Main_Beach_04.jpg",
      alt: "Noosa Main Beach boardwalk under pandanus trees",
      width: 1280,
      height: 853,
      credit: "Photo: Wikimedia Commons (CC BY-SA)",
    },
    intro:
      "Three days, two adults and at least one small human, all the slow bits covered. The boardwalk does most of the work; you bring the snacks. The beaches here are patrolled, the national park is pram-friendly for the first stretch, and the river has the calmer water for first swims. None of this is glamorous; all of it works.",
    days: [
      {
        title: "Day 1 — Bay + boardwalk",
        intro:
          "Land, unpack, and meet the coast without driving anywhere.",
        bullets: [
          { time: "Morning", text: "Main Beach for the first swim — lifeguard-patroled, gentle slope, toilets and showers at the SLSC." },
          { time: "Late morning", text: "Walk the headland boardwalk as far as Tea Tree Bay (1.5 km return; pram-friendly). Watch for koalas in the gum trees above." },
          { time: "Lunch", text: "Hastings Street has the reliable brunch options — book the day before in school holidays." },
          { time: "Afternoon", text: "River put-in at Noosa Sound for a slow kayak (2-person kayaks available, calm water, life jackets included)." },
          { time: "Evening", text: "Dinner somewhere with a kids' menu and a river view. Gympie Terrace (Noosaville) is the cheaper, easier end of town for families." },
        ],
      },
      {
        title: "Day 2 — Hinterland + markets",
        intro:
          "A half-day out of town, then back to the bay for a slow afternoon.",
        bullets: [
          { time: "Morning", text: "Drive to the Pomona hinterland (~25 min). Coffee at the Pomona Railway Station (heritage gallery). Mount Cooroora walk if the legs can do 1.6 km return of steep." },
          { time: "Lunch", text: "Eumundi Markets on Wed/Sat (arrive before 8 am to beat the bus parking); otherwise, Pomona's one café." },
          { time: "Afternoon", text: "Pool at the accommodation, or back to Main Beach for a second swim. The bay is usually calmer in the afternoon." },
          { time: "Evening", text: "Family picnic dinner on the Hastings Street lawn (the lawn opposite the SLSC is the easy one). Ice cream after." },
        ],
      },
      {
        title: "Day 3 — River + slow",
        intro:
          "The river day. No driving required, ever.",
        bullets: [
          { time: "Morning", text: "Noosa Ferry from Noosaville to Hastings Street (40-minute scenic ride; prams and dogs on lead welcome)." },
          { time: "Lunch", text: "Picnic supplies from the Noosa Farmers Market (Sunday only, 7 am – noon, Noosa Junction) — arrive 7 am for produce, 9 am for the croissant queue." },
          { time: "Afternoon", text: "A hire boat (with the small humans strapped in) on the Noosa River — upstream from the Boathouse is the calm stretch." },
          { time: "Evening", text: "Sunset on the headland boardwalk (last light hits Granite Bay). Pack-and-leave dinner at the accommodation." },
        ],
      },
    ],
    gallery: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Noosa_Heads_Main_Beach_04.jpg",
        alt: "Main Beach boardwalk",
        caption: "Main Beach boardwalk — pram-friendly.",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/30/Sand_castles_at_Noosa_Heads_beach%2C_Queensland%2C_Australia_03.jpg",
        alt: "Sand castles on Noosa Main Beach",
        caption: "Sand castles do happen here.",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Tea_Tree_Bay_4.jpg",
        alt: "Tea Tree Bay, Noosa National Park",
        caption: "Tea Tree Bay — the first km of the headland walk.",
      },
    ],
    bookingCtas: [
      { label: "Where to stay", href: "/accommodation", description: "Family-friendly accommodation across all areas." },
      { label: "Hire a kayak", href: "/things-to-do", description: "Half-day and full-day kayak and SUP hire." },
      { label: "Hire a boat", href: "/boats-and-watercraft", description: "Self-drive hire cars on the Noosa River." },
    ],
    tags: ["Family", "Hastings Street", "Noosaville", "Pomona"],
  },
  {
    slug: "beach-lover",
    title: "A beach-lover's long weekend",
    eyebrow: "3 DAYS · SWIM, SURF, SUN",
    hero: {
      src: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Noosa_Heads_Main_Beach_08.jpg",
      alt: "Noosa Main Beach on a busy day",
      width: 1280,
      height: 853,
      credit: "Photo: Wikimedia Commons (CC BY-SA)",
    },
    intro:
      "Three days for the surf-curious and the swim-serious. First Bay is the learner break; Noosa Main is the long right-hander; Alexandria Bay is the walk-to. The water is warmest January through March; the swell is biggest June through September. Pick your trade. All of these beaches are inside the Noosa National Park or on the headland, which means the same boardwalk gets you to most of them.",
    days: [
      {
        title: "Day 1 — Meet the bay",
        intro:
          "Read the surf, then read the tide. The bay is a slow right-hander that wraps around the headland.",
        bullets: [
          { time: "Early", text: "Sunrise at First Bay for a surf check. Lifeguard on duty from 8 am; pre-8 am you're on your own." },
          { time: "Morning", text: "Coffee + flat white on Hastings Street. Hire a longboard if you don't have one (multiple hire shops, board + wax for the day)." },
          { time: "Midday", text: "Lunch at the SLSC (kiosk-style, ocean view, no booking needed)." },
          { time: "Afternoon", text: "Swim at the bay. Walk to Tea Tree Bay if the swell is up — the bay at Granite Bay is usually protected." },
          { time: "Evening", text: "Sunset cruise on the Noosa River (1.5 hrs; boards welcome; book the day before)." },
        ],
      },
      {
        title: "Day 2 — North Shore day",
        intro:
          "A ferry day across the bar to the wide open beach. Different sand, different sky.",
        bullets: [
          { time: "Morning", text: "Vehicle ferry from Tewantin to Noosa North Shore (departs on the hour; cash + card accepted)." },
          { time: "Midday", text: "Beach at the far end — wide, empty, four-wheel-drive access from the ferry terminal." },
          { time: "Lunch", text: "Pack a cooler; there are no shops on the north side of the river mouth." },
          { time: "Afternoon", text: "Surf at the beach break (open beach; check the swell window on the BOM coastal forecast before committing)." },
          { time: "Evening", text: "Back across the ferry. Dinner in Hastings Street (book in advance on weekends)." },
        ],
      },
      {
        title: "Day 3 — Sunrise + slow",
        intro:
          "Sunrise session, slow lunch, slow afternoon, slow evening.",
        bullets: [
          { time: "Sunrise", text: "First session at Main Beach. If the swell is small, the longboard point break is the play." },
          { time: "Late morning", text: "Coffee + a long breakfast. Read the surf report (the live widget on the homepage has the open data)." },
          { time: "Afternoon", text: "Alexandria Bay walk — 5.4 km return on the headland track; you can usually find your own beach at the bottom." },
          { time: "Evening", text: "Pack. Last swim if the wind is up. Dinner somewhere that does simple grilled fish." },
        ],
      },
    ],
    gallery: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Noosa_Heads_Main_Beach_08.jpg",
        alt: "Main Beach on a busy day",
        caption: "Main Beach — the long right-hander.",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Alexandria_Bay.jpg",
        alt: "Alexandria Bay beach",
        caption: "Alexandria Bay — a 5.4 km walk south of Main.",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Ferry_in_the_middle_of_the_Noosa_River%2C_Noosa_North_Shore_Ferries%2C_2019.jpg",
        alt: "Noosa North Shore vehicle ferry",
        caption: "The North Shore ferry — gateway to the wide beach.",
      },
    ],
    bookingCtas: [
      { label: "Surf and weather", href: "/surf-and-weather", description: "Live swell, wind, tide + the live widget." },
      { label: "Where to stay", href: "/accommodation", description: "Hastings Street boutique options." },
      { label: "Hire a board", href: "/things-to-do", description: "Surfboard + SUP hire in walking distance of the bay." },
    ],
    tags: ["Beach", "Surf", "Hastings Street", "Main Beach"],
  },
  {
    slug: "hinterland-wander",
    title: "A hinterland wander",
    eyebrow: "3 DAYS · POMONA · COORAN · COOROY",
    hero: {
      src: "https://upload.wikimedia.org/wikipedia/commons/4/42/Mount_Cooroora_from_Hill_Street_2023.jpg",
      alt: "Mount Cooroora seen from Pomona",
      width: 1280,
      height: 853,
      credit: "Photo: Wikimedia Commons (CC BY-SA)",
    },
    intro:
      "Three days of the Noosa Shire that isn't the beach. The hinterland — Pomona, Cooran, Cooroy — is 25 minutes drive from Hastings Street, and it reads like a different shire. Heritage pubs, gallery railway stations, eucalyptus ridges, and a mountain that you can summit in an hour if your knees agree. Base yourself in Cooran or Pomona; commute in for one beach day if you have to.",
    days: [
      {
        title: "Day 1 — Pomona",
        intro:
          "Pomona is the quiet centre of the hinterland. Heritage pub, gallery railway station, Mount Cooroora.",
        bullets: [
          { time: "Morning", text: "Coffee at the Pomona Railway Station (heritage-listed; gallery open on weekends)." },
          { time: "Midday", text: "Mount Cooroora walk — 1.6 km return, steep, summit views to the coast. Take water; there's no shop at the top." },
          { time: "Lunch", text: "Pub lunch at the Pomona Hotel (heritage pub; river beer garden)." },
          { time: "Afternoon", text: "Drive the Cooran loop (~15 min). Stop at the Cooran School of Arts (gallery)." },
          { time: "Evening", text: "Dinner at the Cooran Hotel (heritage pub, live music some Fridays)." },
        ],
      },
      {
        title: "Day 2 — Coast commute",
        intro:
          "A half-day coast commute. You can drive (25 min) or take the Noosa North Shore ferry if you've got time.",
        bullets: [
          { time: "Morning", text: "Drive down to Noosa Heads. Park at the council car park at the end of Hastings Street (it fills by 9 am in school holidays; arrive 8 am)." },
          { time: "Midday", text: "Headland walk to Alexandria Bay (5.4 km return; the southernmost beach on the park track)." },
          { time: "Lunch", text: "Back at Hastings Street. Avoid the tourist-trap places; the locals' end is south of the SLSC." },
          { time: "Afternoon", text: "Coffee at the Noosa Farmers Market (only if it's Sunday)." },
          { time: "Evening", text: "Back to the hinterland for dinner + an early night." },
        ],
      },
      {
        title: "Day 3 — Cooroy + slow",
        intro:
          "Cooroy is the larger of the three hinterland towns. Heritage main street, the Noosa Botanic Gardens, and a slow river walk.",
        bullets: [
          { time: "Morning", text: "Noosa Botanic Gardens (free entry; dog-friendly; lake walk + a featured restaurant extension; allow 2 hours)." },
          { time: "Late morning", text: "Coffee on Cooroy's main street. The Butter Factory arts centre is worth a look if it's open." },
          { time: "Lunch", text: "Pub lunch at the Cooroy Hotel (heritage pub; bistro)." },
          { time: "Afternoon", text: "Slow walk along the Cooroy-to-Pomona rail trail (flat, 5 km one-way; pick up at either end)." },
          { time: "Evening", text: "Pack. Last coffee on the Cooroy main street." },
        ],
      },
    ],
    gallery: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/42/Mount_Cooroora_from_Hill_Street_2023.jpg",
        alt: "Mount Cooroora from Pomona",
        caption: "Mount Cooroora — the summit view, on a clear day.",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Pomona_railway_station_-_front.jpg",
        alt: "Pomona railway station",
        caption: "Pomona Railway Station — heritage-listed; gallery.",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Dog_beach_at_Noosa_Botanic_Gardens.jpg",
        alt: "Dog beach at Noosa Botanic Gardens",
        caption: "Noosa Botanic Gardens — dog-friendly lake walk.",
      },
    ],
    bookingCtas: [
      { label: "Where to stay", href: "/accommodation", description: "Hinterland B&Bs and cottages." },
      { label: "Things to do", href: "/things-to-do", description: "Walks, galleries, markets." },
      { label: "About Noosa", href: "/about", description: "The shire, beyond the headland." },
    ],
    tags: ["Hinterland", "Pomona", "Cooran", "Cooroy"],
  },
  {
    slug: "foodie",
    title: "A foodie's long weekend",
    eyebrow: "3 DAYS · EAT + DRINK",
    hero: {
      src: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Noosa_Boathouse%2C_Noosaville%2C_Queensland_01.jpg",
      alt: "Noosa Boathouse floating restaurant",
      width: 1280,
      height: 853,
      credit: "Photo: Wikimedia Commons (CC BY-SA)",
    },
    intro:
      "Three days for the table. Hastings Street is the fine-dining strip; Noosa Junction has the brunch places; Gympie Terrace (Noosaville) has the riverfront value; the Sunshine Beach village has the locals. Head of Noosa Brewing does the brewery tour if you're a beer person; the boathouse does the sunset drink if you're a wine person. None of this is anonymous — these are named venues with real food, sourced from the manifest.",
    days: [
      {
        title: "Day 1 — Hastings Street",
        intro:
          "The walkable end. Pedestrian strip, palm trees, and the highest density of independent restaurants in the shire.",
        bullets: [
          { time: "Morning", text: "Coffee at Locale (Hastings Street) — sit-down brunch, slow service, worth it." },
          { time: "Lunch", text: "Bistro C on Hastings Street (the bar is the easy walk-in; the dining room needs a booking)." },
          { time: "Afternoon", text: "Wine flight at a Hastings Street cellar door (multiple; the smaller ones are the better ones)." },
          { time: "Evening", text: "Dinner at Bang Bang Noosa (Modern Asian; book 4 weeks ahead in summer)." },
        ],
      },
      {
        title: "Day 2 — Junction + river",
        intro:
          "Noosa Junction for brunch; Noosaville for river-watching; Boathouse for the floating-drink moment.",
        bullets: [
          { time: "Morning", text: "Brunch at a Junction café (multiple; the slow ones are south of the Sunshine Beach Rd intersection)." },
          { time: "Midday", text: "Heads of Noosa Brewing Co. tour + tasting (book ahead; allow 1.5 hours)." },
          { time: "Lunch", text: "Gympie Terrace (Noosaville) — riverfront, casual, cheaper than Hastings Street. Gusto is the easy walk-in." },
          { time: "Afternoon", text: "Noosa Boathouse for a slow drink on the floating deck. Watch the boats come in." },
          { time: "Evening", text: "Dinner at Season Restaurant (Hastings Street; book 3 weeks ahead in school holidays)." },
        ],
      },
      {
        title: "Day 3 — Sunshine + market",
        intro:
          "Sunshine Beach for the village brunch; Noosa Farmers Market (Sundays only) for produce; last meal on the river.",
        bullets: [
          { time: "Morning", text: "Sunshine Beach village brunch (the local end; not the chain end)." },
          { time: "Late morning", text: "Noosa Farmers Market (Sunday only, 7 am – noon, Noosa Junction). Arrive 7 am for produce, 9 am for the croissant queue." },
          { time: "Lunch", text: "Zibros on Hastings Street for Italian (the easy walk-in is the bar; the dining room needs a booking)." },
          { time: "Afternoon", text: "Coffee + a long sit at Locale. Read. Watch the street." },
          { time: "Evening", text: "Last dinner at the Royal Mail Hotel in Tewantin (heritage pub; riverside beer garden; the bistro is the easy walk-in)." },
        ],
      },
    ],
    gallery: [
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Noosa_Boathouse%2C_Noosaville%2C_Queensland_01.jpg",
        alt: "Noosa Boathouse floating restaurant",
        caption: "Noosa Boathouse — floating deck on the river.",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/1/14/Bar_at_Bistro_C%2C_Hastings_Street%2C_Noosa_Heads%2C_Queensland.jpg",
        alt: "Bistro C bar, Hastings Street",
        caption: "Bistro C — the bar is the easy walk-in.",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/6/60/Noosa_farmers_market.jpg",
        alt: "Noosa Farmers Market",
        caption: "Noosa Farmers Market — Sunday, 7 am – noon.",
      },
    ],
    bookingCtas: [
      { label: "Where to stay", href: "/accommodation", description: "Hastings Street + Noosaville options." },
      { label: "Eat and drink", href: "/things-to-do", description: "All named venues." },
      { label: "What's on", href: "/things-to-do#events", description: "Markets + live music calendar." },
    ],
    tags: ["Eat & drink", "Hastings Street", "Noosa Junction", "Noosaville"],
  },
];

export function getItinerary(slug: string): Itinerary | undefined {
  return ITINERARIES.find((i) => i.slug === slug);
}