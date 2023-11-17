import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Input from "../generic/Input.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import { formatTime } from "../../utils/helpers.js";
import { faPlay, faPause, faRedo, faStepForward } from '@fortawesome/free-solid-svg-icons';


const Countdown = () => {
    //state to keep track of time
    const [time, setTime] = useState(150); //default 2m 30s
    //state to determine if timer is running
    const [isRunning, setIsRunning] = useState(false);
    //state to store user input in MM:SS format
    const [inputTime, setInputTime] = useState('02:30');
    //state to keep track of the target time in seconds
    const [targetTime, setTargetTime] = useState(150); //default 2m 30s
    //state to determine if end button was clicked
    const [endClicked, setEndClicked] = useState(false);

    //update targetTime and setTime when user inputTime changes
    useEffect(() => {
        //split inputTime into minutes and seconds, then calculate the new target time in seconds
        const [minutes, seconds] = inputTime.split(':').map(val => parseInt(val, 10));
        const newTargetTime = (minutes * 60 + seconds) || 0;
        setTargetTime(newTargetTime);
        if (!isRunning && !endClicked) {
            setTime(newTargetTime);
        }
    }, [inputTime, isRunning, endClicked]);

    //handle countdown logic
    useEffect(() => {
        let interval;

        //if timer is running and time is greater than 0, start countdown
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1); //decrease time by 1 every second
            }, 1000);
        } else if (time === 0 || endClicked) {
            // If time is 0 or end button was clicked, stop the timer
            setIsRunning(false);
        }

        //clear interval when component unmounts or timer is not running
        return () => clearInterval(interval);
    }, [isRunning, time, endClicked]);

    //function to handle input changes
    const handleInputChange = (e) => {
        setInputTime(e.target.value);
        setEndClicked(false);
    };

    //function to start or pause the timer
    const startPauseTimer = () => {
        setIsRunning(isRunning => !isRunning);
    };

    //function to reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setTime(targetTime);
        setEndClicked(false);
    };

    //function to end the timer
    const endTimer = () => {
        setTime(0);
        setIsRunning(false);
        setEndClicked(true);
    };

    //render timer and control buttons
    return (
        <div>
            <Panel>
                <Input label="Set Time" value={inputTime} onChange={handleInputChange} />
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
