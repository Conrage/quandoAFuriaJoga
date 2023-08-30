import { NextResponse } from 'next/server'
import axios from 'axios';

const headers = {
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Accept': 'application/vnd.neptune+json; version=1'
}

export async function GET(req, res) {
    const { searchParams } = req.nextUrl;
    const team_id = searchParams.get('team_id') || 35132;
    const allAndLive = await axios.get(`https://neptune.1337pro.com/series/grouped/all-and-live?start_after=1693364400000&start_before=1693450799999`, { headers });
    const teamLive = allAndLive.data.items.filter((match) => {
        return match.participants.filter(part => part.team_id === team_id)[0]
    });
    return NextResponse.json(teamLive.filter(match => match.lifecycle === 'live'));
}