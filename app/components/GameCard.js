import moment from "moment/moment";
import 'moment/locale/pt-br'
import { useEffect, useState } from "react";
import axios from "axios";

moment.locale('pt-br')

export default function GameCard({ matchDate, tournamentName, enemy, next, scores }) {
  const [furiaWinstreak, setFuriaWinstreak] = useState(0);
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
    if(scores) {
      const enemyKey = Object.keys(scores).find(key => key != '99555');
      setEnemyScore(scores[enemyKey])
    }
    if (next) fetchData();
  }, [])

  return (
    <div className="w-full bg-white p-2 relative px-2 sm:px-4 md:px-10 rounded-md h-fit flex items-center">
      {next && <div className="bg-blue-600 text-white font-montserrat text-sm top-0 absolute min-w-fit p-1 px-4 rounded-b-lg font-bold tracking-[-.05rem]">Próxima partida</div>}
      <div className="w-full flex justify-start items-center">
        <div className="flex gap-2">
          <img src="/furia.png" className="h-12 xs:h-16 sm:h-20 drop-shadow-xl"></img>
        </div>
        {next && <div className={`flex items-center gap-1 mx-auto ${furiaWinstreak > enemyWinstreak ? '' : 'opacity-70'}`}>
          <div className={`font-montserrat font-bold text-base sm:text-xl ${furiaWinstreak > enemyWinstreak ? 'text-red-500' : 'text-mine-shaft-200'}`}>{furiaWinstreak}</div>
          <img src="/fire.png" className={`h-4 sm:h-6 ${furiaWinstreak > enemyWinstreak ? '' : 'grayscale opacity-40'}`}></img>
        </div>}
      </div>
      <div className="min-w-fit flex flex-col items-center h-full justify-center">
        <div className="flex flex-col justify-start items-center h-12">
          <div className="font-extrabold font-montserrat text-mine-shaft-900 text-base sm:text-xl">{moment.utc(matchDate).format('HH:mm')}</div>
          <div className="font-medium font-montserrat text-xs sm:text-sm mb-auto text-mine-shaft-300">{moment.utc(matchDate).format('D [de] MMMM YYYY')}</div>
        </div>
        <div className="flex items-center justify-center gap-6 w-full">
          <span className={`font-extrabold font-montserrat text-3xl ${scores['99555'] < enemyScore ? 'opacity-30 text-mine-shaft-900' : 'text-green-500'}`}>{scores['99555']}</span>
          <img src="/versus.png" className="mt-2 h-8 sm:h-14"></img>
          <span className={`font-extrabold font-montserrat text-3xl ${scores['99555'] > enemyScore ? 'opacity-30 text-mine-shaft-900' : 'text-green-500'}`}>{enemyScore}</span>
        </div>
        <div className="font-semibold font-montserrat h-12 text-xs sm:text-base flex items-end text-blue-700">{tournamentName}</div>
      </div>
      <div className="w-full flex flex-row-reverse justify-start items-center">
        <div className="flex gap-2">
          {enemy.team_logo ? <img src={enemy.team_logo} className="h-12 object-contain aspect-square w-12 xs:w-16 sm:w-20 xs:h-16 sm:h-20"></img> : <div className="font-montserrat w-20 truncate text-mine-shaft-300 text-base sm:text-xl font-bold">{enemy.team_name}</div>}
        </div>
        {next && <div className={`flex items-center gap-1 mx-auto ${enemyWinstreak > furiaWinstreak ? '' : 'opacity-70'}`}>
          <div className={`font-montserrat font-bold text-base sm:text-xl ${enemyWinstreak > furiaWinstreak ? 'text-red-500' : 'text-mine-shaft-200'}`}>{enemyWinstreak}</div>
          <img src="/fire.png" className={`h-4 sm:h-6 ${furiaWinstreak > furiaWinstreak ? '' : 'grayscale opacity-40'}`}></img>
        </div>}
      </div>
    </div>
  )
}