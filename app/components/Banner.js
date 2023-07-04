import { useEffect, useRef } from 'react'
export default function Banner() {
    const banner = useRef()

    const atOptions = {
		'key' : '3acdde6796f141e49d2ee80049410461',
		'format' : 'iframe',
		'height' : 600,
		'width' : 160,
		'params' : {}
	};
    useEffect(() => {
        if (banner.current && !banner.current?.firstChild) {
            const conf = document.createElement('script')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.profitabledisplaynetwork.com/3acdde6796f141e49d2ee80049410461/invoke.js`
            conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

            banner.current.append(conf)
            banner.current.append(script)
        }
    }, [banner])

    return <div className="w-0 sm:w-1/5 border border-gray-200 justify-center items-center text-white text-center" ref={banner}></div>
}