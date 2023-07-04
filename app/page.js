'use client';

import { useEffect, useState } from "react"
import axios from 'axios';
import GameCard from "./components/GameCard";
import Banner from "./components/Banner";
import Banner2 from "./components/Banner2";

const stateFilterEnum = {
  GONNA_PLAY: 0,
  ALREADY_PLAYED: 1,
  ALL: 2,
}

export default function Home() {
  const [stateFilter, setStateFilter] = useState(stateFilterEnum.GONNA_PLAY);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState('00:00:00');

  const getTimeRemaining = (endtime) => {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }


  const initializeClock = (endtime) => {
    if (!endtime) return setCountdown('Sem data marcada');
    const timeinterval = setInterval(() => {
      const t = getTimeRemaining(endtime) || {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      const formattedTime = t.days ? `${t.days} dias ${t.hours < 10 ? '0' + t.hours : t.hours}:${t.minutes < 10 ? '0' + t.minutes : t.minutes}:${t.seconds < 10 ? '0' + t.seconds : t.seconds}` : `${t.hours < 10 ? '0' + t.hours : t.hours}:${t.minutes < 10 ? '0' + t.minutes : t.minutes}:${t.seconds < 10 ? '0' + t.seconds : t.seconds}`;
      setCountdown(formattedTime);
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }, 1000);
  }


  const fetchMatches = async (params) => {
    setLoading(true);
    try {
      const res = await axios.get('/api/get-matches', { params });
      setMatches(res.data);
      if(matches[0]?.lifecycle === 'live') setCountdown('AO VIVO')
      else if (countdown === '00:00:00') initializeClock(res.data[0]?.start_date);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMatches({ upcoming: true });
  }, []);

  useEffect(() => {
    setFilteredMatches(matches);
  }, [matches.length])

  useEffect(() => {
    if(loading) return;
    if (stateFilter === stateFilterEnum.ALL) fetchMatches({ all: true });
    else if (stateFilter === stateFilterEnum.GONNA_PLAY) fetchMatches({ upcoming: true });
    else if (stateFilter === stateFilterEnum.ALREADY_PLAYED) fetchMatches({ upcoming: false });
  }, [stateFilter])

  return (
    <div className='relative h-screen w-screen bg-white flex justify-center overflow-hidden'>
      <Banner id="banner1"></Banner>
      <main className='z-10 w-[1320px] lg:min-w-[850px] h-full bg-white p-4 md:p-6 lg:p-10 flex flex-col gap-4'>
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center'>
          <img src='/logo.png' alt="Quando a Furia joga?" className='h-10 md:h-14 drop-shadow-xl'></img>
          <h1 className='flex gap-2 items-center font-montserrat font-black uppercase text-base md:text-lg text-mine-shaft-900 tracking-[-.08rem]'>{countdown === 'Sem data marcada' ? 'A fúria está' : 'A fúria joga em'}
            {!loading || countdown != '00:00:00' ? <span className='font-semibold md:text-2xl text-lg tracking-tight drop-shadow-lg normal-case'>{countdown}</span> : <svg className="animate-spin z-10 h-8 w-8 text-mine-shaft-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>}
          </h1>
        </div>
        {matches[0]?.lifecycle === 'live' && <GameCard live={true} scores={matches[0].scores} next={false} key={matches[0].id} enemy={matches[0].participants.find(participant => participant.team_id != 35132)} matchDate={matches[0].start_date} tournamentName={matches[0].tournament.name}></GameCard>}
        <div className="flex h-full w-full gap-6">
          <div className="flex flex-col h-full w-full gap-4 pb-10">
            <div className='flex flex-col sm:flex-row gap-2 w-full mt-2 md:mt-12'>
              <div className='flex items-center w-full md:w-72 group'>
                <span className='material-symbols-outlined absolute z-10 ml-3 transition text-blue-900 text-opacity-50 group-focus-within:text-blue-700'>search</span>
                <input onChange={(e) => setFilteredMatches(matches.filter(match => match.participants.find(participant => participant.team_id != 35132).team_name.toLowerCase().startsWith(e.target.value.toLowerCase())))} className='hover:shadow-2xl hover:shadow-gray-300 hover:border-blue-700 transition text-mine-shaft-900 outline-none focus:border-blue-700 font-semibold focus:shadow-2xl focus:bg-white text-mine-shaft-900 focus:shadow-gray-300 relative border-2 border-blue-800 border-opacity-10 placeholder:text-gray-300 w-full bg-gray-50 shadow-lg shadow-gray-50 p-2 placeholder:font-medium text-sm pl-10 py-2.5 rounded-md font-montserrat' placeholder='Buscar coitados'></input>
              </div>
              {<div className='flex relative items-center p-1 w-full md:w-72 rounded-lg bg-blue-800 bg-opacity-10 gap-1 h-11 text-sm lg:text-base'>
                <div onClick={() => setStateFilter(stateFilterEnum.GONNA_PLAY)} className={`z-10 rounded-md flex-1 truncate transition cursor-pointer px-3 h-full font-montserrat font-bold grid tracking-[-0.09rem] place-items-center ${stateFilter === stateFilterEnum.GONNA_PLAY ? 'text-blue-700' : 'text-blue-900 text-opacity-30 hover:bg-blue-900 hover:bg-opacity-5'}`}>Vai jogar</div>
                <div onClick={() => setStateFilter(stateFilterEnum.ALREADY_PLAYED)} className={`z-10 rounded-md flex-1 truncate transition cursor-pointer px-3 h-full font-montserrat font-bold grid tracking-[-0.09rem] place-items-center ${stateFilter === stateFilterEnum.ALREADY_PLAYED ? 'text-blue-700' : 'text-blue-900 text-opacity-30 hover:bg-blue-900 hover:bg-opacity-5'}`}>Já jogou</div>
                <div onClick={() => setStateFilter(stateFilterEnum.ALL)} className={`z-10 rounded-md transition flex-1 truncate cursor-pointer px-3 h-full font-montserrat font-bold grid tracking-[-0.09rem] place-items-center ${stateFilter === stateFilterEnum.ALL ? 'text-blue-700' : 'text-blue-900 text-opacity-30 hover:bg-blue-900 hover:bg-opacity-5'}`}>Todas</div>
                <span className={`transition absolute bg-white h-9 w-[calc(33%_-_.25rem)] rounded-md ${stateFilter === stateFilterEnum.ALREADY_PLAYED ? 'translate-x-[calc(100%_+_.25rem)]' : (stateFilter === stateFilterEnum.GONNA_PLAY ? 'translate-x-0' : 'translate-x-[calc(200%_+_.47rem)]')}`}></span>
              </div>}
            </div>
            <div className="max-h-[80%] h-full w-full bg-blue-800 bg-opacity-10 rounded-lg p-2 sm:p-3 flex flex-col overflow-y-auto overflow-x-hidden items-center gap-2">
              {loading ? <svg className="animate-spin mt-6 z-10 h-12 w-12 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> : filteredMatches.filter(match => match.lifecycle != 'live').map((match, index) => <GameCard scores={match.scores} next={index === 0 && match.lifecycle != 'over'} key={match.id} enemy={match.participants.find(participant => participant.team_id != 35132)} matchDate={match.start_date} tournamentName={match.tournament.name}></GameCard>)}
              {filteredMatches.filter(match => match.lifecycle != 'live').length <= 0 && !loading ? <div className="font-montserrat text-blue-900 mt-4 font-extrabold tracking-[-.06rem] uppercase">Nenhuma partida da super Furia</div> : ''}
            </div>
          </div>
          <div className="hidden flex-col lg:flex w-1/3 gap-2">
            <div className="flex w-full items-center justify-between">
              <h2 className="font-montserrat font-black uppercase text-base md:text-base text-mine-shaft-900 tracking-[-.06rem]">Super opiniões</h2>
              <img src="/super.png" alt="Foto do especialista" className="rounded-full h-12"></img>
            </div>
            <div className="flex flex-col mt-4 p-1 rounded-md">
              <div className="font-montserrat font-extrabold text-sm text-mine-shaft-900">WOOD precisa voltar ás origens</div>
              <div className="font-montserrat font-medium text-sm text-mine-shaft-900 mt-2">A conta é simples, mesmo com baixo impacto de awp, o capitão já provou que consegue fazer seus times renderem nessa situação.</div>
            </div>
            <div className="flex flex-col mt-4 p-1 rounded-md">
              <div className="font-montserrat font-extrabold text-sm text-mine-shaft-900">TOP 2 nacional</div>
              <div className="font-montserrat font-medium text-sm text-mine-shaft-900 mt-2">Com adição de dupla semifinalista de major, MIBR tem tudo para ser o segundo melhor time brasileiro.</div>
            </div>
          </div>
        </div>
      </main>
      <Banner2 id="banner2"></Banner2>
    </div>
  )
}
