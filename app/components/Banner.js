import { useEffect, useRef } from 'react'
export default function Banner({ id }) {
  const ads = useRef()

  const atOptions = {
    'key': '3acdde6796f141e49d2ee80049410461',
    'format': 'iframe',
    'height': 600,
    'width': 160,
    'params': {}
  };
  useEffect(() => {
    setTimeout(() => {
      if (ads.current && !ads.current?.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.profitabledisplaynetwork.com/3acdde6796f141e49d2ee80049410461/invoke.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        ads.current.append(conf);
        ads.current.append(script);
      }
    }, 1000)
  }, [ads])

  return <div className="w-0 md:w-1/5 h-full flex flex-col gap-4 border border-gray-200 py-10 items-center text-white text-center"><div className="rounded-md border-2 w-[160px] overflow-clip h-[600px]" ref={ads}></div> </div>
}