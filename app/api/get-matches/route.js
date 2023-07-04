import { NextResponse } from 'next/server'
import axios from 'axios';

const headers = {
  'Authorization': `Bearer ${process.env.API_TOKEN}`,
  'Accept': 'application/vnd.neptune+json; version=1'
}

export async function GET(req, res) {
  const { searchParams } = req.nextUrl;
  const upcoming = searchParams.get('upcoming') || true;
  const all = searchParams.get('all');
  if (all) {
    const upcomingMatches = await axios.get(`https://neptune.1337pro.com/teams/35132/series?upcoming=true`, { headers });
    const resultMatches = await axios.get(`https://neptune.1337pro.com/teams/35132/series?upcoming=false`, { headers });
    const matches = [...upcomingMatches.data, ...resultMatches.data];
    return NextResponse.json(matches);
  }
  const matches = await axios.get(`https://neptune.1337pro.com/teams/35132/series?upcoming=${upcoming}`, { headers })
  return NextResponse.json(matches.data);
}