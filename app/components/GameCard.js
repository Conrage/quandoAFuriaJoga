import moment from "moment/moment";
import 'moment/locale/pt-br'
import { useEffect, useState } from "react";
import axios from "axios";

moment.locale('pt-br')

export default function GameCard({ matchDate, tournamentName, enemy, next, scores, live, furia
 }) {
  const [furiaWinstreak, setFuriaWinstreak] = useState(0);
  const [furiaKey, setFuriaKey] = useState('99555');
  const [enemyWinstreak, setEnemyWinstreak] = useState(0);
  const [enemyScore, setEnemyScore] = useState(0);


  const fetchWinstreak = async (params) => {
    try {
      const res = await axios.get('/api/get-winstreak', { params });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const fetchData = async () => {
    const fWinstreak = await fetchWinstreak({ team_id: '35132' })
    setFuriaWinstreak(fWinstreak.winstreak);

    const eWinstreak = await fetchWinstreak({ team_id: enemy.team_id })
    setEnemyWinstreak(eWinstreak.winstreak);
  }

  useEffect(() => {
    setFuriaKey(furia?.id);
    if(scores) {
      console.log(furiaKey)
      const enemyKey = Object.keys(scores).find(key => key != furiaKey);
      setEnemyScore(scores[enemyKey])
    }
    if (next) fetchData();
  }, [])

  return (
    <div className={`w-full min-h-[10rem] bg-white p-2 relative px-2 sm:px-4 md:px-10 rounded-md h-fit flex items-center ${live ? 'border-4 border-red-600 shadow-lg shadow-red-50 my-6' : ''}`}>
      {next && <div className="bg-blue-600 text-white font-montserrat text-sm top-0 absolute min-w-fit p-1 px-4 rounded-b-lg font-bold tracking-[-.05rem]">Próxima partida</div>}
      {live && <div className="top-0 absolute flex"><div className="bg-red-600 text-white font-montserrat text-sm min-w-fit p-1 px-4 rounded-bl-lg font-bold tracking-[-.05rem]">FURIA está ao vivo</div><a href="https://www.twitch.tv/gaules" target="blank" className="hover:bg-indigo-700 transition bg-indigo-600 text-white font-montserrat text-sm min-w-fit p-1 px-4 rounded-br-lg font-bold tracking-[-.05rem] flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-white border relative grid place-items-center"><div className="h-2 w-2 animate-ping absolute rounded-full bg-white border"></div></div>Bota no Gaules</a></div>}
      <div className="w-full flex justify-start items-center">
        <div className="flex gap-2">
          <img src="/furia.png" alt="Furia" className="h-12 w-12 xs:w-16 sm:w-20 xs:h-16 sm:h-20 drop-shadow-xl object-contain aspect-square"></img>
        </div>
        {next && <div className={`flex items-center gap-1 mx-auto ${furiaWinstreak > enemyWinstreak ? '' : 'opacity-70'}`}>
          <div className={`font-montserrat font-bold text-base sm:text-xl ${furiaWinstreak > enemyWinstreak ? 'text-red-500' : 'text-mine-shaft-200'}`}>{furiaWinstreak}</div>
          <img src="/fire.png" alt="Winstreak" className={`h-4 sm:h-6 ${furiaWinstreak > enemyWinstreak ? '' : 'grayscale opacity-40'}`}></img>
        </div>}
      </div>
      <div className="min-w-fit flex flex-col items-center h-full justify-start">
       {!live && <div className="flex flex-col justify-start items-center h-12">
          <div className="font-extrabold font-montserrat text-mine-shaft-900 text-base sm:text-xl">{moment(matchDate).format('HH:mm')}</div>
          <div className="font-medium font-montserrat text-xs sm:text-sm mb-auto text-mine-shaft-300">{moment(matchDate).format('D [de] MMMM YYYY')}</div>
        </div>}
        <div className="flex items-center justify-center gap-6 w-full">
          <span className={`font-extrabold font-montserrat text-3xl ${scores[furiaKey] < enemyScore ? 'opacity-30 text-mine-shaft-900' : 'text-green-500'}`}>{scores[furiaKey]}</span>
          <img src="/versus.png" alt="Versus" className="mt-2 h-8 sm:h-14"></img>
          <span className={`font-extrabold font-montserrat text-3xl ${scores[furiaKey] > enemyScore ? 'opacity-30 text-mine-shaft-900' : 'text-green-500'}`}>{enemyScore}</span>
        </div>
        <div className={`font-semibold font-montserrat h-12 text-xs sm:text-base flex items-end absolute bottom-2 ${!live ? 'text-blue-700' : 'text-red-600'}`}>{tournamentName}</div>
      </div>
      <div className="w-full flex flex-row-reverse justify-start items-center">
        <div className="flex gap-2">
          {enemy.team_logo ? <img src={enemy.team_logo} alt={enemy.team_name} className="h-12 object-contain aspect-square w-12 xs:w-16 sm:w-20 xs:h-16 sm:h-20"></img> : <div className="font-montserrat w-20 truncate text-mine-shaft-300 text-base sm:text-xl font-bold">{enemy.team_name}</div>}
        </div>
        {next && <div className={`flex items-center gap-1 mx-auto ${enemyWinstreak > furiaWinstreak ? '' : 'opacity-70'}`}>
          <div className={`font-montserrat font-bold text-base sm:text-xl ${enemyWinstreak > furiaWinstreak ? 'text-red-500' : 'text-mine-shaft-200'}`}>{enemyWinstreak}</div>
          <img src="/fire.png" alt="Winstreak" className={`h-4 sm:h-6 ${enemyWinstreak > furiaWinstreak ? '' : 'grayscale opacity-40'}`}></img>
        </div>}
      </div>
    </div>
  )
}