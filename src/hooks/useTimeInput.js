import { useState } from 'react';

const useTimeInput = (initialMinutes = '00', initialSeconds = '00') => {
    const [inputMinutes, setInputMinutes] = useState(initialMinutes);
    const [inputSeconds, setInputSeconds] = useState(initialSeconds);
    const [calculatedTime, setCalculatedTime] = useState(parseInt(initialMinutes, 10) * 60 + parseInt(initialSeconds, 10));

    const handleMinutesChange = (e) => {
        const newMinutes = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
        setInputMinutes(newMinutes);
        const newCalculatedTime = parseInt(newMinutes, 10) * 60 + parseInt(inputSeconds, 10);
        setCalculatedTime(newCalculatedTime);
    };

    const handleSecondsChange = (e) => {
        const newSeconds = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
        setInputSeconds(newSeconds);
        const newCalculatedTime = parseInt(inputMinutes, 10) * 60 + parseInt(newSeconds, 10);
        setCalculatedTime(newCalculatedTime);
    };

    return { inputMinutes, inputSeconds, calculatedTime, handleMinutesChange, handleSecondsChange };
};

export default useTimeInput;
