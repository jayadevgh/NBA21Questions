import type { Player } from "./types";

const yes = "Yes.";
const no = "No.";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

export function fallbackAnswer(q: string, player: Player): string {
  const txt = q.toLowerCase();
  const any = (...k: string[]) => k.some(s => txt.includes(s));

  // fuzzy text match
  const tnorm = norm(txt);

  if (any("team", "play for", "played for")) {
    for (const team of player.teams) {
      const t = norm(team);
      if (tnorm.includes(t) || t.includes(tnorm)) return yes;
    }
    return no;
  }

  if (any("mvp", "most valuable")) return player.mvp ? yes : no;

  if (any("college", "school"))
    return player.college !== "None" ? `Yes, ${player.college}.` : "No, straight to the NBA.";

  if (any("height", "tall", "short")) {
    const tall = player.height >= 200;
    if (any("tall")) return tall ? "Yes, he's tall." : "No.";
    if (any("short")) return tall ? "No." : "Yes, he's short.";
    return `${player.height} cm.`;
  }

  if (any("champ", "ring", "title"))
    return player.championships > 0 ? `Yes, ${player.championships} rings.` : "No rings.";

  if (any("position")) return `He's a ${player.position}.`;

  if (any("active", "retired", "currently playing"))
    return player.active ? "Still active." : "Retired.";

  // fuzzy conference inference
  if (any("west", "east", "conference")) {
    const westTeams = ["lakers","warriors","suns","mavericks","spurs","thunder","jazz","clippers","blazers","nuggets","kings","grizzlies","timberwolves","pelicans","rockets"];
    const eastTeams = ["bulls","cavaliers","celtics","wizards","heat","magic","raptors","knicks","nets","hawks","bucks","pacers","pistons","hornets","76ers"];
    const playedWest = player.teams.some(t => westTeams.some(w => norm(t).includes(w)));
    const playedEast = player.teams.some(t => eastTeams.some(e => norm(t).includes(e)));
    if (any("west", "western")) return playedWest ? yes : no;
    if (any("east", "eastern")) return playedEast ? yes : no;
  }

  return "I don't know.";
}

// smarter non-repeating hint generator
export function randomHint(p: Player, used: string[]): string {
  const all = [
    `Position: ${p.position}`,
    `Height: ${p.height} cm`,
    `College: ${p.college}`,
    `MVP: ${p.mvp ? "Yes" : "No"}`,
    `Rings: ${p.championships}`,
    `Teams: ${p.teams.join(", ")}`,
    `Status: ${p.active ? "Active" : "Retired"}`,
  ];
  const unused = all.filter(h => !used.includes(h));
  return unused[Math.floor(Math.random() * unused.length)] || all[Math.floor(Math.random() * all.length)];
}
