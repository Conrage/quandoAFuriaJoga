import { useEffect, useRef } from 'react'
export default function Banner2({ id }) {
  const bannerRef = useRef()

  const atOptions = {
    'key': '249035ff3765c4fd1c0cb951d60b3d38',
    'format': 'iframe',
    'height': 300,
    'width': 160,
    'params': {}
  };
  useEffect(() => {
    if (bannerRef.current && !bannerRef.current?.firstChild) {
      const conf = document.createElement('script')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.profitabledisplaynetwork.com/249035ff3765c4fd1c0cb951d60b3d38/invoke.js`
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

      bannerRef.current.append(conf);
      bannerRef.current.append(script);
    }
  }, [bannerRef])

  return <div className="w-0 md:w-1/5 h-full flex flex-col gap-4 border border-gray-200 py-10 items-center text-white text-center"><h3 className="font-montserrat w-fit font-extrabold uppercase tracking-[-0.08rem] text-sm text-mine-shaft-900">Esmola do Crazynn</h3><div className="rounded-md border-2 w-[160px] h-[300px] bg-black" ref={bannerRef}></div> </div>
}