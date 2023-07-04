import { useEffect, useRef } from 'react'
export default function Banner() {
    const banner = useRef()

    const atOptions = {
		'key' : 'ee68111e13bc7e12227ad9f1949588cb',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
    useEffect(() => {
        if (banner.current && !banner.current?.firstChild) {
            const conf = document.createElement('script')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.profitabledisplaynetwork.com/ee68111e13bc7e12227ad9f1949588cb/invoke.js`
            conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

            banner.current.append(conf)
            banner.current.append(script)
        }
    }, [banner])

    return <div className="w-0 sm:w-1/5 border border-gray-200 justify-center items-center text-white text-center" ref={banner}></div>
}