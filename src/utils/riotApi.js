export async function getAccountInfo(gameName, tagLine) {
  const response = await fetch(
    `http://localhost:5000/account/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
  );
  if (!response.ok) throw new Error("Account not found");
  return response.json();
}

export async function getMatchHistory(puuid, start = 0, count = 10) {
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
