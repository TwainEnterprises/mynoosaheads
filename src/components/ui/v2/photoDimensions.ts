/**
 * True intrinsic dimensions for the surf inline photographs.
 *
 * MSN-3100 rework (Victor QA round 1, F1): V2Figure previously hard-coded
 * a 1280x720 box for every photograph, but the four surf images have three
 * different ratios. The wrong reserved box meant the page shifted 102-419 px
 * when a lazy image arrived, and a full-page capture that never scrolled
 * showed a flat navy block instead of the photograph.
 *
 * Every value below was MEASURED, not estimated: each Wikimedia Commons
 * thumbnail was fetched over the network on 2026-10-30 and its JPEG SOF
 * header parsed for the real pixel dimensions.
 *
 *   inline[0] Children learning to surf ...  1280 x  960   (4:3)
 *   inline[1] Early-morning paddle-out .....  1280 x  960   (4:3)
 *   inline[2] Stand-up paddleboarder .......  1280 x 1707   (3:4 portrait)
 *   inline[3] The boardwalk along Main Beach  1280 x  959   (4:3)
 *
 * The map is keyed by the Commons file name so a photo swap cannot
 * silently mis-associate a ratio: an unknown file throws rather than
 * falling back to a guess.
 */

/** Intrinsic pixel size of a photograph. */
export type PhotoDimensions = {
  width: number;
  height: number;
};

const DIMENSIONS_BY_FILE: Record<string, PhotoDimensions> = {
  "Children_learning_surfing_at_Noosa_Heads_beach,_Queensland.jpg": {
    width: 1280,
    height: 960,
  },
  "Noosa_Heads_beach_on_Christmas_Day_2015_04.jpeg": {
    width: 1280,
    height: 960,
  },
  "Man_with_stand_up_board_at_Noosa_Heads_beach,_Queensland.jpg": {
    width: 1280,
    height: 1707,
  },
  "Boardwalk_along_Noosa_Heads’_main_beach,_Queensland.jpg": {
    width: 1280,
    height: 959,
  },
};

/**
 * Resolve the measured intrinsic dimensions for a Wikimedia thumbnail URL.
 *
 * Throws if the file has not been measured, so a swapped photo fails the
 * build rather than silently reserving a wrong box.
 */
export function figureDimensions(url: string): PhotoDimensions {
  const last = decodeURIComponent(url.split("/").pop() ?? "");
  // Wikimedia thumbnail URLs end in "<width>px-<file name>".
  const file = last.replace(/^\d+px-/, "");
  const found = DIMENSIONS_BY_FILE[file];
  if (!found) {
    throw new Error(
      "No measured dimensions for \"" + file + "\". Measure the image and " +
        "add it to DIMENSIONS_BY_FILE in src/components/ui/v2/photoDimensions.ts.",
    );
  }
  return found;
}
