// In-game adjustments — CFB 27 defensive intelligence layer
// Replaces the CFB 26 trait-reactive settings file.
// Exports:
//   ADJUSTMENTS          — trait-triggered settings (same schema as v26: section/icon/setting/reason/triggers)
//   MATCH_CHECKS         — match-coverage check intelligence (verified flag = confirmed in CFB 27 College build)
//   CLUSTER_ANSWERS      — man-coverage answers vs stacks and bunches
//   PLASTER, SMART_ZONES, ROLL_COVERAGE — reference tables for UI
//   getAdjustmentChain(flat, opts) — composes the full pre-snap chain for a scouted profile

// ── Trait-reactive settings ─────────────────────────────────────────────────
export const ADJUSTMENTS = [
  // ── Smart Zones (NEW CFB 27) ──────────────────────────────────────────────
  { section:"Smart Zones", icon:"🧠", setting:"Zone Style: Aggressive + Look For Work",
    reason:"Zone defenders jump routes entering their area and hunt work when their zone is empty — the fix for defenders guarding grass. Base setting vs quick game and West Coast timing offenses. Risk: double moves behind an aggressive jumper.",
    triggers:["quick_game","west_coast","slant_heavy","qb_checkdown"] },
  { section:"Smart Zones", icon:"🧠", setting:"Zone Style: Conservative",
    reason:"Defenders sink and cap routes instead of jumping. Use when he lives on double moves, back-shoulder throws, and deep shots — do not let a jumped hitch become a 60-yard sluggo.",
    triggers:["deep_shots","back_shoulder"] },
  { section:"Smart Zones", icon:"🧠", setting:"Focus: deep help on his #1 target",
    reason:"Leans deep zone help toward one receiver every snap without changing the shell. Set it on the elite WR (or seam TE) and leave it — it quietly wins the 1-on-1s you never see.",
    triggers:["elite_wr","elite_te","slot_threat"] },
  { section:"Smart Zones", icon:"🧠", setting:"Red Zone Awareness: On inside the 25",
    reason:"Zone defenders respect the back line and squeeze routes instead of carrying them out of the end zone. Flip it on every red-zone series vs fade/back-shoulder teams.",
    triggers:["redzone_spec","back_shoulder"] },

  // ── Plaster (NEW CFB 27 — the scramble answer) ────────────────────────────
  { section:"Plaster", icon:"🩹", setting:"Plaster: Aggressive · Trigger: Out of Pocket · Speed: Default",
    reason:"When the QB leaves the pocket, zone dissolves into man and defenders lock their nearest threat — kills the scramble-drill throw that broke zone coverage in 26. Pair with a spy; Plaster covers the receivers, the spy covers the runner.",
    triggers:["qb_scramble","mobile_qb","dual_threat"] },
  { section:"Plaster", icon:"🩹", setting:"Plaster: Conservative · Trigger: Out of Pocket and Time",
    reason:"Only converts to man when the play extends AND he escapes — keeps zone integrity vs pocket passers who occasionally slide. Use vs pocket QBs so route-runners can't drag your zones deep on schedule throws.",
    triggers:["qb_pocket","qb_checkdown"] },

  // ── Roll Coverage (NEW CFB 27) ────────────────────────────────────────────
  { section:"Roll Coverage", icon:"🎰", setting:"Roll: WR1 (or Fastest)",
    reason:"Shades the shell's deep help to his best receiver pre-snap without a full coverage change. Vs a true alpha WR this plus Focus is a season-long double team.",
    triggers:["elite_wr","deep_shots"] },
  { section:"Roll Coverage", icon:"🎰", setting:"Roll: TE1",
    reason:"Deep help leans to the seam-running TE — the throw that beats single-high. Use with any Cover 3/Cover 1 call vs elite TEs.",
    triggers:["elite_te","seam_routes"] },
  { section:"Roll Coverage", icon:"🎰", setting:"Roll: Field",
    reason:"Help to the wide side where space lives. Default vs field-hash attackers and wide trips surfaces.",
    triggers:["field_hash","trips","four_wide"] },

  // ── Cluster answers (NEW CFB 27 — man vs stacks and bunches) ─────────────
  { section:"Cluster Answers", icon:"🧩", setting:"vs Bunch: Point Triangle (or Lock only with elite DBs)",
    reason:"Triangle bracket over the bunch point beats the rub game — defenders exchange routes instead of chasing through traffic. Lock is faster but every pick play wins vs Lock.",
    triggers:["bunch","motion_heavy"] },
  { section:"Cluster Answers", icon:"🧩", setting:"vs Stacks: Bingo (in/out exchange)",
    reason:"Banjo the stacked pair: outside defender takes first out-breaker, inside takes first in-breaker. Kills switch releases and stack fades without a coverage change.",
    triggers:["stack_align"] },

  // ── Coaching Adjustments (NEW CFB 27) ─────────────────────────────────────
  { section:"Coaching", icon:"📋", setting:"Gap Integrity: Conservative",
    reason:"Every defender holds his assigned fit. Mandatory vs option, counter/trap, and zone-scheme runs — one freelancer is the crease. Go Aggressive only vs weak OLs you dominate.",
    triggers:["option_run","counter_trap","inside_run","rpo"] },
  { section:"Coaching", icon:"📋", setting:"Defensive Aggression: Conservative",
    reason:"Slow-plays the run and refuses the play-action bite. The counter to PA-heavy and boot offenses; accepts giving up 3-yard runs to never give up the 40-yard PA post.",
    triggers:["play_action","tempo_shift"] },
  { section:"Coaching", icon:"📋", setting:"Defensive Aggression: Aggressive",
    reason:"Downhill triggers vs run-first teams that rarely fake. Costs: bites on PA, more penalties, faster fatigue — flip back the moment he shows play-action off the same look.",
    triggers:["run_heavy_1st","strong_oline","fb_lead","short_yardage_run"] },

  // ── Safety Setup (carried over from 26, options expanded in 27) ───────────
  { section:"Safety Setup", icon:"🔭", setting:"Depth: Deep (25 yds)",
    reason:"Protects against deep shots and elite receivers — safeties must not get beat over the top. Do not use vs run-heavy teams.",
    triggers:["deep_shots","back_shoulder","two_minute_pass"] },
  { section:"Safety Setup", icon:"🔭", setting:"Depth: Tight (5 yds)",
    reason:"Converts safety to a run-support box defender. Only when run threat is confirmed — sub back to default the moment he spreads.",
    triggers:["p22","short_yardage_run"] },
  { section:"Safety Setup", icon:"🔭", setting:"Depth: Close (8 yds)",
    reason:"Mid-depth for play action and TE seam routes — stays out of the box without surrendering the intermediate window.",
    triggers:["play_action","elite_te","crossers"] },
  { section:"Safety Setup", icon:"🔭", setting:"Width: Spread",
    reason:"Spread safeties wide to match split receivers and trips surfaces. Do not use vs heavy run formations.",
    triggers:["trips","p10","four_wide","empty"] },
  { section:"Safety Setup", icon:"🔭", setting:"Width: Pinch",
    reason:"Pinch safeties toward interior for seam route help and run support with multiple TEs or power personnel.",
    triggers:["p13","fb_lead","seam_routes"] },

  // ── CB Alignment (NEW controls in 27) ─────────────────────────────────────
  { section:"CB Alignment", icon:"📏", setting:"CB Depth: Off (8-10 yds)",
    reason:"Cushion vs pure speed — concede the hitch, never the go. Pair with Aggressive Smart Zones so the hitch window stays small.",
    triggers:["elite_wr","deep_shots"] },
  { section:"CB Alignment", icon:"📏", setting:"CB Depth: Press + Inside Leverage",
    reason:"27 leverage matters: inside press walls slants, digs, and crossers at the release. Use vs quick-game and mesh teams; avoid vs pure outside speed unless safety help sits over the top.",
    triggers:["slant_heavy","crossers","quick_game"] },

  // ── Zone Drops (carried over) ─────────────────────────────────────────────
  { section:"Zone Drops", icon:"📐", setting:"Curl Flats: Shallow (6-8 yds)",
    reason:"Closes bubble screens and quick flat routes — critical vs RPO and quick-game teams who take free yards at the catch.",
    triggers:["quick_game","hurry_up","rpo"] },
  { section:"Zone Drops", icon:"📐", setting:"Curl Flats: Deep (14-17 yds)",
    reason:"Pushes curl defenders deeper to undercut comeback and intermediate out routes vs West Coast / crossing-heavy offenses.",
    triggers:["west_coast","no_deep","qb_pocket"] },
  { section:"Zone Drops", icon:"📐", setting:"Hook Zones: Deep (18-22 yds)",
    reason:"Drops hook defenders deeper to take away TE seam releases and slot combos off play action.",
    triggers:["seam_routes","elite_te","deep_shots"] },
  { section:"Zone Drops", icon:"📐", setting:"Regular Flats: Tight (5 yds)",
    reason:"Aggressive flat depth to punish bubble reads and quick RB releases out of the backfield.",
    triggers:["screens","p10","flat_attack"] },

  // ── Pre-Snap Disguise (carried over) ──────────────────────────────────────
  { section:"Pre-Snap", icon:"🎭", setting:"Show Blitz (LB Bluff)",
    reason:"Walk a LB to the line pre-snap to create protection confusion — holds the RB in pass pro and disrupts the QB's pre-snap read.",
    triggers:["qb_pre_snap","qb_one_read","motion_heavy","rpo"] },
  { section:"Pre-Snap", icon:"🎭", setting:"Shade: Up (Over Top)",
    reason:"DL alignment over the top of blockers — disrupts zone blocking assignments and seals outside run lanes.",
    triggers:["outside_run","hb_stretch","option_run"] },
  { section:"Pre-Snap", icon:"🎭", setting:"Shade: Down (Underneath)",
    reason:"DL slants underneath blocks — compresses interior gaps vs inside zone, power, and short yardage.",
    triggers:["inside_run","counter_trap","fb_lead","strong_oline"] },

  // ── QB Threat (upgraded: Plaster replaces blind blitz suppression) ────────
  { section:"QB Threat", icon:"🏃", setting:"Spy + Plaster Aggressive — the 27 scramble kit",
    reason:"The spy mirrors the runner; Plaster locks the receivers when he escapes. Together they end the scramble drill. Blitzing a scrambler is now viable again IF both are set — the 26-era rule of never blitzing mobile QBs is obsolete.",
    triggers:["mobile_qb","qb_scramble"] },
  { section:"QB Threat", icon:"🏈", setting:"Option Keys: DE dive, LB QB, Safety pitch — no exceptions",
    reason:"One unassigned option key is an automatic touchdown. Never freelance. Pair with Gap Integrity: Conservative.",
    triggers:["option_run"] },
  { section:"Keys & Reads", icon:"🏈", setting:"RPO Read Key: Conservative",
    reason:"Do not commit until ball is handed or thrown — attacking the mesh point early creates missed assignments and open lanes.",
    triggers:["rpo","dual_threat","mobile_qb","qb_scramble"] },
];

// ── Match coverage checks ────────────────────────────────────────────────────
// verified:true  = confirmed present in CFB 27 College build
// verified:false = exists in the shared EA match system; confirm in the lab before relying on it in-game
export const MATCH_CHECKS = [
  { id:"combo", label:"Combo", base:["Cover 1","Cover 2 Man"], vs:["stack_align"], verified:true,
    when:"Stacked receivers running switch releases and rubs.",
    what:"Flips the natural assignment: the deep/back defender takes the FRONT receiver, the underneath/inside defender takes the BACK receiver. Nobody chases through the pick.",
    risk:"Double-vertical from the stack briefly stresses the deep player — keep a safety over the top." },
  { id:"box", label:"Box", base:["Cover 1","Cover 2 Man"], vs:["bunch"], verified:true,
    when:"3-man bunch running the rub game.",
    what:"Four defenders divide the bunch into quadrants — deep-out, deep-in, flat, short-in. Routes are caught by zones of responsibility, not chased through traffic.",
    risk:"Spends four defenders on three receivers with no blitzer among them; the iso X on the other side is truly alone." },
  { id:"bingo", label:"Bingo", base:["Cover 1","Cover 2 Man"], vs:["bunch","stack_align"], verified:true,
    when:"Bunch or stack where their #1 is dangerous on outside releases.",
    what:"Box quadrant rules, except the outside corner locks man-to-man if #1 stays outside — a pattern-match hybrid of Box and Lock.",
    risk:"The corner lock is a personnel bet; if #1 wins outside there is no quadrant behind him." },
  { id:"triangle", label:"Triangle / Point Triangle", base:["Cover 1","Cover 2 Man"], vs:["bunch","stack_align"], verified:true,
    when:"Stacks (Triangle) or bunches (Point Triangle keys the point man).",
    what:"A 3-over-2 or 4-over-3 bracket with a safety reading the deeper route — the cluster is covered as a shape, not as individuals.",
    risk:"Bunch run-blocking can crack the bracket; keep a force defender honest." },
  { id:"stubbie", label:"Stubbie", base:["Cover 4 Quarters","Cover 4 Palms"], vs:["trips","quick_game"], verified:true,
    when:"Trips-side quick game and spacing concepts.",
    what:"The corner locks #1 man-to-man while the nickel, safety, and underneath defender share #2 and #3 — the quick triangle gets swarmed at the sticks.",
    risk:"The corner is manned with no help; verticals from #2/#3 stress the sharers. Pair with deep hook depth." },
  { id:"solo", label:"Solo / Solo Cut", base:["Cover 4 Quarters","Cover 6"], vs:["trips","seam_routes"], verified:true,
    when:"3x1 sets — the single-receiver-side answer.",
    what:"Decides whether the corner or the safety takes the isolated receiver, freeing the other to help — the freed safety poaches #3 vertical crossing from trips.",
    risk:"Whoever takes the iso man is alone; do not call it if their X is the alpha unless you trust that matchup." },
  { id:"zoneit", label:"Zone It", base:["Cover 3 Match","Cover 4 Quarters"], vs:["motion_heavy","bunch"], verified:true,
    when:"Heavy motion or rub-game teams punishing your matching rules.",
    what:"Turns off all matching — everyone plays straight zone in their assigned area. The simplest picture, immune to picks.",
    risk:"Straight zone softens vs verticals and flooding; this is a reset button, not a base call." },
  { id:"stress", label:"Stress", base:["Cover 4 Quarters","Cover 3 Match"], vs:["four_wide","deep_shots","empty"], verified:false,
    when:"Four verticals / all-go looks, especially from 2x2 or empty.",
    what:"Safeties midpoint the two verticals to their side while corners carry — every seam gets capped instead of splitting one post safety.",
    risk:"Underneath crossers run free while everyone carries deep. Do not call it vs mesh teams." },
  { id:"skate", label:"Skate", base:["Cover 3 Match"], vs:["trips","flat_attack"], verified:false,
    when:"Trips flood concepts — three levels to the strong side.",
    what:"Coverage rotates to the trips side, flooding their flood: strong rotation buzzes the flat and caps the corner route.",
    risk:"Backside is 1-on-1 with a deep third. Backside dig and slant windows open." },
  { id:"meg", label:"MEG (Man Everywhere he Goes)", base:["Cover 3 Match","Cover 4 Quarters"], vs:["elite_wr"], verified:false,
    when:"Isolated X receiver you trust your corner against.",
    what:"That corner locks his man across the formation; the rest of the coverage plays its match rules undisturbed.",
    risk:"No help. If he wins the release, the shell cannot save you. A personnel bet, not a scheme bet." },
];

// ── Reference tables ─────────────────────────────────────────────────────────
export const PLASTER = {
  modes: ["Off","Conservative","Aggressive"],
  triggers: ["Out of Pocket and Time","Out of Pocket","Time"],
  speeds: ["Conservative","Default","Aggressive"],
  note: "Plaster converts zone to man when the trigger fires. Aggressive + Out of Pocket is the scramble-drill killer; Conservative + both-conditions preserves zone discipline vs pocket QBs.",
};

export const SMART_ZONES = {
  styles: ["Ultra Conservative","Conservative","Balanced","Aggressive","Ultra Aggressive"],
  behaviors: ["Look For Work","Plaster","Red Zone Awareness","Focus"],
  note: "Aggression sets how hard zone defenders drive on routes in their area. Look For Work sends empty-zone defenders hunting. Focus leans deep help to one receiver.",
};

export const ROLL_COVERAGE = ["Fastest","Field","Boundary","Highest OVR","Pass Strength","WR1","WR2","WR3","TE1","TE2"];

export const CLUSTER_ANSWERS = {
  stack: ["Combo","Triangle","Top Hat","Lock"],
  bunch: ["Point Combo","Point Triangle","Lock"],
  note: "Lock is fastest but loses to every rub. Exchange calls (Combo/Triangle/Bingo) trade assignments through the pick instead of chasing.",
};

// ── Chain composer ───────────────────────────────────────────────────────────
// Returns the prioritized adjustment chain for a scouted trait profile.
// opts: { max: number of spotlight items (default 3), coverage: current coverage name for check filtering }
export function getAdjustmentChain(flat, opts = {}) {
  const max = opts.max ?? 3;
  const hits = ADJUSTMENTS
    .map(a => ({ ...a, matched: a.triggers.filter(t => flat.includes(t)) }))
    .filter(a => a.matched.length > 0)
    .sort((a, b) => b.matched.length - a.matched.length);

  const checks = MATCH_CHECKS
    .map(c => ({ ...c, matched: c.vs.filter(t => flat.includes(t)) }))
    .filter(c => c.matched.length > 0)
    .sort((a, b) => b.matched.length - a.matched.length);

  // Deduplicate spotlight by section — one headline per section keeps the chain scannable in-game
  const seen = new Set();
  const spotlight = [];
  for (const h of hits) {
    if (seen.has(h.section)) continue;
    seen.add(h.section);
    spotlight.push(h);
    if (spotlight.length >= max) break;
  }

  return { spotlight, all: hits, checks: checks.slice(0, 2) };
}
