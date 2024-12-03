// riotApi.js

// Existerande funktioner för att hämta kontoinformation, matchhistorik, och matchdetaljer
export async function getAccountInfo(gameName, tagLine) {
  const response = await fetch(
    `http://localhost:5000/account/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
  );
  if (!response.ok) throw new Error("Account not found");
  return response.json();
}

export async function getMatchHistory(puuid, start = 0, count = 20) {
  const response = await fetch(
    `http://localhost:5000/match-history/${puuid}?start=${start}&count=${count}`
  );
  if (!response.ok) throw new Error("Match history not found");
  return response.json();
}

export async function getMatchDetails(matchId) {
  const response = await fetch(`http://localhost:5000/match-details/${matchId}`);
  if (!response.ok) throw new Error("Match details not found");
  return response.json();
}

// Ny funktion för att hämta match-timeline
export async function getMatchTimeline(matchId) {
  const response = await fetch(`http://localhost:5000/match-timeline/${matchId}`);
  if (!response.ok) throw new Error("Timeline not found");
  const data = await response.json();
  console.log("Timeline Data:", data); // Logga timeline-data för felsökning
  return data;
}

// Ny funktion för att bearbeta skadedata
export function processDamageDetails(timeline, participantId) {
  const damageFrom = {}; // Skador mottagna av deltagaren
  const damageTo = {}; // Skador orsakade av deltagaren

  timeline.info.frames.forEach((frame) => {
    frame.events.forEach((event) => {
      // Skador mottagna av deltagaren
      if (event.victimId === participantId && event.victimDamageReceived) {
        event.victimDamageReceived.forEach((damage) => {
          const source = damage.name || "Unknown"; // Champion eller källa
          const totalDamage = damage.magicDamage + damage.physicalDamage + damage.trueDamage;
          damageFrom[source] = (damageFrom[source] || 0) + totalDamage;
        });
      }

      // Skador orsakade av deltagaren
      if (event.victimDamageDealt) {
        event.victimDamageDealt.forEach((damage) => {
          if (damage.participantId === participantId) {
            const target = damage.name || "Unknown"; // Mål för skadan
            const totalDamage = damage.magicDamage + damage.physicalDamage + damage.trueDamage;
            damageTo[target] = (damageTo[target] || 0) + totalDamage;
          }
        });
      }
    });
  });

  console.log("Damage From:", damageFrom);
  console.log("Damage To:", damageTo);

  return { damageFrom, damageTo };
}





