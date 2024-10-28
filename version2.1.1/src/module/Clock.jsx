import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTime(new Date())
        }, 1000);

        return () => clearInterval(timeInterval)
    }, [])

    return <div className="absolute top-[10px] right-[15px] text-[15px]">{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
}

export default Clock;