import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Input from "../generic/Input.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import { formatTime } from "../../utils/helpers.js";
import { faPlay, faPause, faRedo, faStepForward } from '@fortawesome/free-solid-svg-icons';
import useTimeInput from "../../hooks/useTimeInput";

//calculate initial time from default values
const initialTime = parseInt('02', 10) * 60 + parseInt('30', 10);

const Countdown = () => {
    //using the custom hook for handling time input
    const { inputMinutes, inputSeconds, targetTime, handleMinutesChange, handleSecondsChange } = useTimeInput('02', '30');
    //state to keep track of time
    const [time, setTime] = useState(initialTime);
    //state to determine if timer is running
    const [isRunning, setIsRunning] = useState(false);

    //handle countdown logic
    useEffect(() => {
        let interval;

        //if timer is running and time is greater than 0, start countdown
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1); //decrease time by 1 every second
            }, 1000);
        } else if (time === 0) {
            // If time is 0, stop the timer
            setIsRunning(false);
        }

        //clear interval when component unmounts or timer is not running
        return () => clearInterval(interval);
    }, [isRunning, time]);

    //function to start or pause the timer
    const startPauseTimer = () => {
        setIsRunning(isRunning => !isRunning);
    };

    //function to reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setTime(targetTime);
    };

    //function to end the timer
    const endTimer = () => {
        setTime(0);
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

export default Countdown;
