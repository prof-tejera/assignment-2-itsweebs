import { useState, useEffect } from 'react';

const useTimeInput = (initialMinutes = '00', initialSeconds = '00') => {
    const [inputMinutes, setInputMinutes] = useState(initialMinutes);
    const [inputSeconds, setInputSeconds] = useState(initialSeconds);
    const [targetTime, setTargetTime] = useState(0);

    useEffect(() => {
        const newTargetTime = (parseInt(inputMinutes, 10) * 60 + parseInt(inputSeconds, 10)) || 0;
        setTargetTime(newTargetTime);
    }, [inputMinutes, inputSeconds]);

    const handleMinutesChange = (e) => {
        setInputMinutes(e.target.value.slice(0, 2));
    };

    const handleSecondsChange = (e) => {
        setInputSeconds(e.target.value.slice(0, 2));
    };

    return { inputMinutes, inputSeconds, targetTime, handleMinutesChange, handleSecondsChange };
};

export default useTimeInput;