import { useEffect, useRef } from 'react'
export default function Banner2({ id }) {
  const bannerRef = useRef()

  const atOptions = {
    'key': '3acdde6796f141e49d2ee80049410461',
    'format': 'iframe',
    'height': 600,
    'width': 160,
    'params': {}
  };
  useEffect(() => {
    setTimeout(() => {
      if (bannerRef.current && !bannerRef.current?.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.profitabledisplaynetwork.com/3acdde6796f141e49d2ee80049410461/invoke.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        bannerRef.current.append(conf);
        bannerRef.current.append(script);
      }
    }, 1000)
  }, [bannerRef])

  return <div className="w-0 md:w-1/5 h-full flex flex-col gap-4 border border-gray-200 py-10 items-center text-white text-center"><h3 className="font-montserrat w-fit font-extrabold uppercase tracking-[-0.08rem] text-sm text-mine-shaft-900">Esmola do Crazynn</h3><div className="rounded-md overflow-clip border-2 w-[160px] h-[600px]" ref={bannerRef}></div> </div>
}