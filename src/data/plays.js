// plays.js — CFB 27 play-structure database (built from play art)
// Schema per play:
//   n      name (exact in-game)
//   badge  EA family label: BLITZ | MAN | ZONE | MATCH
//   rush   total rushers (includes contain rushers)
//   cont   rushers assigned QB Contain (purple arrows)
//   spy    QB Spy defenders (brown/tan ellipse)
//   deep   deep-zone defenders (blue ellipses; Tampa pole counts here)
//   shell  0 | 1 | 2 | 3 | 4 | "tampa" | "6"  — deep structure
//   und    underneath zone defenders (curl/flat, hook, hard flat, cloud, robber, hole)
//   man    man-coverage defenders (bare markers)
//   press  true if press technique shown
//   notes  structural quirks that change how the play behaves
// INVARIANT: rush + deep + und + man + spy === 11

export const PLAYS = {
  "3-4 Under 4 Tech": [
    { n:"Will Fire 3 Seam",     badge:"BLITZ", rush:5, cont:0, spy:0, deep:3, shell:3, und:3, man:0, notes:"Fire zone; seam-flat carriers instead of standard curl-flat — better vs verticals" },
    { n:"Weak Blitz 3",         badge:"BLITZ", rush:5, cont:0, spy:0, deep:3, shell:3, und:3, man:0, notes:"Weak-side fire zone" },
    { n:"FS Slant 3",           badge:"BLITZ", rush:5, cont:0, spy:0, deep:3, shell:3, und:3, man:0, notes:"FS is the 5th rusher; line slants away — secondary blitz, late arrival" },
    { n:"MLB Cross Fire 3",     badge:"BLITZ", rush:5, cont:0, spy:0, deep:3, shell:3, und:3, man:0, notes:"Both ILBs cross inside; BOTH OLBs drop — interior heat, open edges = scramble lanes" },
    { n:"Saw Blitz 1",          badge:"BLITZ", rush:5, cont:0, spy:0, deep:1, shell:1, und:0, man:5, notes:"Cover 1 five-man pressure, no rat — hot throws live inside" },
    { n:"Weak Blitz 1",         badge:"MAN",   rush:5, cont:0, spy:0, deep:1, shell:1, und:0, man:5, notes:"Man pressure, weak-side overload" },
    { n:"Cover 1 FS Fire",      badge:"BLITZ", rush:5, cont:0, spy:0, deep:1, shell:1, und:0, man:5, notes:"FS fires the edge; SS rotates to the deep middle" },
    { n:"Cov 1 QB Contain Spy", badge:"BLITZ", rush:5, cont:2, spy:0, deep:1, shell:1, und:0, man:5, notes:"BOTH edges contain — but NO true spy despite the name. Pocket-squeeze, not a mirror." },
    { n:"Pinch Buck 0",         badge:"BLITZ", rush:6, cont:0, spy:0, deep:0, shell:0, und:0, man:5, notes:"Cover 0 — someone is free, so is his hot read" },
    { n:"Dbl Safety Blitz",     badge:"BLITZ", rush:6, cont:0, spy:0, deep:0, shell:0, und:0, man:5, notes:"Cover 0 with both safeties off depth — max disguise, max exposure" },
    { n:"Cover 1 Hole Wk",      badge:"MAN",   rush:4, cont:0, spy:0, deep:1, shell:1, und:1, man:5, notes:"Man free with a weak-side hole rat" },
    { n:"Cover 1 Robber Press", badge:"MAN",   rush:4, cont:0, spy:0, deep:1, shell:1, und:1, man:5, press:true, notes:"SS robs the hole; press outside — mesh/slant thief" },
    { n:"Cover 2 Man",          badge:"MAN",   rush:4, cont:0, spy:0, deep:2, shell:2, und:0, man:5, notes:"Halves over man — pick-vulnerable without checks" },
    { n:"Cover 2 Invert",       badge:"ZONE",  rush:4, cont:0, spy:0, deep:2, shell:2, und:5, man:0, notes:"Post-snap rotation shell — disguise value; thin deep middle" },
    { n:"Cover 3 Hard Flat",    badge:"ZONE",  rush:4, cont:0, spy:0, deep:3, shell:3, und:4, man:0, notes:"Spot-drop C3; hard flats jump the quick game — corner route window behind them" },
    { n:"Cover 3 Match",        badge:"MATCH", rush:4, cont:0, spy:0, deep:3, shell:3, und:4, man:0, notes:"Match rules; curl-flat (not hard flat) drops" },
    { n:"Cover 3 Sky",          badge:"ZONE",  rush:4, cont:0, spy:0, deep:3, shell:3, und:4, man:0, notes:"SS is the sky force player — the base run-down call" },
    { n:"Cover 4 Quarters",     badge:"MATCH", rush:4, cont:0, spy:0, deep:4, shell:4, und:3, man:0, notes:"Pattern-match quarters — the verticals answer" },
    { n:"Cover 6",              badge:"MATCH", rush:4, cont:0, spy:0, deep:3, shell:"6", und:4, man:0, notes:"Quarter-quarter-half with a cloud corner to the half side" },
  ],
  "3-4 Under": [
    { n:"Will Fire 3 Seam",     badge:"BLITZ", rush:5, cont:0, spy:0, deep:3, shell:3, und:3, man:0, notes:"Fire zone off the Will" },
    { n:"Weak Blitz 3",         badge:"BLITZ", rush:5, cont:0, spy:0, deep:3, shell:3, und:3, man:0, notes:"Weak-side fire zone" },
    { n:"FS Slant 3",           badge:"BLITZ", rush:5, cont:0, spy:0, deep:3, shell:3, und:3, man:0, notes:"FS is the 5th rusher; disguised, arrives late" },
    { n:"MLB Cross Fire 3",     badge:"BLITZ", rush:5, cont:0, spy:0, deep:3, shell:3, und:3, man:0, notes:"ILBs cross; BOTH OLBs drop to curl-flat — open edges, scramble risk" },
    { n:"Saw Blitz 1",          badge:"BLITZ", rush:5, cont:0, spy:0, deep:1, shell:1, und:0, man:5, notes:"Cover 1 five-man pressure, no rat" },
    { n:"Weak Blitz 1",         badge:"BLITZ", rush:5, cont:0, spy:0, deep:1, shell:1, und:0, man:5, notes:"Man pressure, weak overload" },
    { n:"Cover 1 FS Fire",      badge:"BLITZ", rush:5, cont:0, spy:0, deep:1, shell:1, und:0, man:5, notes:"FS fires; SS rotates to deep middle" },
    { n:"Cov 1 QB Contain Spy", badge:"BLITZ", rush:4, cont:1, spy:1, deep:1, shell:1, und:0, man:5, notes:"TRUE SPY: one edge contains, an ILB mirrors the QB, other OLB plays man. The mobile-QB call." },
    { n:"Pinch Buck 0",         badge:"BLITZ", rush:6, cont:0, spy:0, deep:0, shell:0, und:0, man:5, notes:"Cover 0 max pressure" },
    { n:"Dbl Safety Blitz",     badge:"BLITZ", rush:6, cont:0, spy:0, deep:0, shell:0, und:0, man:5, notes:"Cover 0, both safeties rush" },
    { n:"Cover 1 Hole Wk",      badge:"MAN",   rush:4, cont:0, spy:0, deep:1, shell:1, und:1, man:5, notes:"Man free, weak-side hole rat" },
    { n:"Cover 1 Robber Press", badge:"MAN",   rush:4, cont:0, spy:0, deep:1, shell:1, und:1, man:5, press:true, notes:"SS robber, press outside" },
    { n:"Cover 2 Man",          badge:"MAN",   rush:4, cont:0, spy:0, deep:2, shell:2, und:0, man:5, notes:"Halves over man" },
    { n:"Tampa 2",              badge:"ZONE",  rush:4, cont:0, spy:0, deep:3, shell:"tampa", und:4, man:0, notes:"Two halves + ILB running the pole; cloud flats. Deep middle covered, but the pole runner is a LB." },
    { n:"Cover 3 Hard Flat",    badge:"ZONE",  rush:4, cont:0, spy:0, deep:3, shell:3, und:4, man:0, notes:"Hard flats jump quick game; corner route lives behind them" },
    { n:"Cover 3 Match",        badge:"MATCH", rush:4, cont:0, spy:0, deep:3, shell:3, und:4, man:0, notes:"Match rules, curl-flat drops" },
    { n:"Cover 3 Sky",          badge:"ZONE",  rush:4, cont:0, spy:0, deep:3, shell:3, und:4, man:0, notes:"SS sky force — base run-down call" },
    { n:"Cover 4 Quarters",     badge:"MATCH", rush:4, cont:0, spy:0, deep:4, shell:4, und:3, man:0, notes:"Pattern-match quarters" },
    { n:"Cover 6",              badge:"MATCH", rush:4, cont:0, spy:0, deep:3, shell:"6", und:4, man:0, notes:"QQH, cloud corner to the half side" },
  ],
};

// ── Derived capabilities ─────────────────────────────────────────────────────
// Turns play art into the structural facts the engine and Formation Info page use.
export function getCapabilities(formation) {
  const list = PLAYS[formation];
  if (!list || !list.length) return null;
  const rushes = list.map(p => p.rush);
  const spyPlays = list.filter(p => p.spy > 0);
  const contPlays = list.filter(p => p.cont > 0);
  const zeroPlays = list.filter(p => p.shell === 0);
  const blitzPlays = list.filter(p => p.rush >= 5);
  // A blitz with no spy and no contain leaves the QB an escape lane.
  const looseBlitzes = blitzPlays.filter(p => p.spy === 0 && p.cont === 0);
  const shells = [...new Set(list.map(p => String(p.shell)))];
  return {
    playCount: list.length,
    rushMin: Math.min(...rushes),
    rushMax: Math.max(...rushes),
    maxCoverage: 11 - Math.min(...rushes),
    hasSpy: spyPlays.length > 0,
    spyPlays: spyPlays.map(p => p.n),
    hasContain: contPlays.length > 0,
    containPlays: contPlays.map(p => p.n),
    hasZero: zeroPlays.length > 0,
    zeroPlays: zeroPlays.map(p => p.n),
    blitzCount: blitzPlays.length,
    blitzRate: Math.round((blitzPlays.length / list.length) * 100),
    looseBlitzCount: looseBlitzes.length,
    shells: shells.sort(),
    hasQuarters: list.some(p => p.shell === 4),
    hasTwoHigh: list.some(p => p.shell === 2 || p.shell === "tampa" || p.shell === "6"),
    // Scramble containment: can this formation answer a mobile QB with a real tool?
    scrambleAnswer: spyPlays.length > 0 ? "spy" : contPlays.length > 0 ? "contain" : "none",
    matchCount: list.filter(p => p.badge === "MATCH").length,
  };
}

export const PLAY_FORMATIONS = Object.keys(PLAYS);
