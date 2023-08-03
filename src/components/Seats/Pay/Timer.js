import React, { useEffect } from 'react';

const Timer = () => {
    const [min, setMin] = useState(15);
    const [sec, setSec] = useState(0);
    const time = useRef(180);
    const timerId = useRef(null);

    useEffect(() => {
        timerId.current = setInterval(() => {
            setMin(parseInt(time.current / 60));
            setSec(time.current % 60);
            time.current -= 1;
        }, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    useEffect(() => {
        if (time.current <= 0) {
            clearInterval(timerId.current);
        }
    }, [sec]);

    return (
        <div className="timer">
            {min}:{sec}
        </div>
    );
};
