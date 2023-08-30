import { NextResponse } from 'next/server'
import axios from 'axios';

const headers = {
  'Authorization': `Bearer ${process.env.API_TOKEN}`,
  'Accept': 'application/vnd.neptune+json; version=1'
}

export async function GET(req, res) {
  const { searchParams } = req.nextUrl;
  const team_id = searchParams.get('team_id') || '35132';
  const matches = await axios.get(`https://neptune.1337pro.com/teams/${team_id}/series?upcoming=false`, { headers });
  let winstreak = 0;
  for (let i = 0; i < matches.data.sort((a, b) => new Date(a.end_date) - new Date(b.end_date)).length; i++) {
    const participantId = matches.data[i].participants.filter(part => part.team_id === team_id).id;
    const keys = Object.keys(matches.data[i].scores);
    const otherTeam = keys.find(key => key != participantId);
    const win = matches.data[i].scores[participantId] > matches.data[i].scores[otherTeam];
    if (!win) break;
    else winstreak++;
  };
  return NextResponse.json({ winstreak })
}