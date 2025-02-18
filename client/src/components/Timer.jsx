import { useEffect, useState } from "react";

const Timer = ({ duration, onTimeout }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        if (timeLeft === 0) {
            clearInterval(interval);
            onTimeout();
        }

        return () => clearInterval(interval);
    }, [timeLeft]);

    return <div>Time Left: {timeLeft}s</div>;
};

export default Timer;
