import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Input from "../generic/Input.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import { formatTime } from "../../utils/helpers.js";
import { faPlay, faPause, faRedo, faStepForward } from '@fortawesome/free-solid-svg-icons';
import useTimeInput from "../../hooks/useTimeInput";


const Stopwatch = () => {
    //using the custom hook for handling time input
    const { inputMinutes, inputSeconds, targetTime, handleMinutesChange, handleSecondsChange } = useTimeInput('02', '30');
    //state to keep track of time
    const [time, setTime] = useState(0);
    //state to determine if timer is running
    const [isRunning, setIsRunning] = useState(false);

    //handle stopwatch logic
    useEffect(() => {
        let interval;

        //if timer is running and hasn't reached target time, start stopwatch
        if (isRunning && time < targetTime) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1); //increase time by 1 every second
            }, 1000);
        } else if (time === targetTime) {
            //if time reaches target time, stop the timer
            setIsRunning(false);
        }

        //clear interval when component unmounts or when it's not running
        return () => clearInterval(interval);
    }, [isRunning, time, targetTime]);

    //function to start or pause the timer
    const startPauseTimer = () => {
        setIsRunning(isRunning => !isRunning);
    };

    //function to reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
    };

    //function to end the timer
    const endTimer = () => {
        setTime(targetTime);
        setIsRunning(false);
    };

    //render timer and control buttons
    return (
        <div>
            <Panel>
                Set Time:
                <div className="input-container">
                    <Input type="number" label="m&nbsp;" value={inputMinutes} onChange={handleMinutesChange} maxLength={2} max={60} />
                    <Input type="number" label="s" value={inputSeconds} onChange={handleSecondsChange} maxLength={2} max={59} />
                </div>
            </Panel>
            <DisplayTime>
                {formatTime(time)}
            </DisplayTime>
            <Panel className="control-panel">
                <div className="start-button-container">
                    <Button className="button-start" label={isRunning ? "Pause" : "Start"} icon={isRunning ? faPause : faPlay} onClick={startPauseTimer} />
                </div>
                <div className="buttons-container">
                    <Button className="button-reset" label="Reset" icon={faRedo} onClick={resetTimer} />
                    <Button className="button-end" label="End" icon={faStepForward} onClick={endTimer} />
                </div>
            </Panel>
        </div>
    );
};

export default Stopwatch;
