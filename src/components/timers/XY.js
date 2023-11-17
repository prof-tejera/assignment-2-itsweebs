import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Input from "../generic/Input.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import DisplayRounds from "../generic/DisplayRounds.js";
import { formatTime } from "../../utils/helpers.js";
import { faPlay, faPause, faRedo, faForward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import useTimeInput from "../../hooks/useTimeInput";
import useRoundsInput from "../../hooks/useRoundsInput";


const XY = () => {
    //define default values
    const defaultTime = 90;
    const defaultRounds = 10;

    //using the custom hook for handling time input
    const { inputMinutes, inputSeconds, calculatedTime, handleMinutesChange, handleSecondsChange } = useTimeInput('01', '30');
    //using the custom hook for handling rounds input
    const { rounds, handleRoundsChange } = useRoundsInput('10');
    //state to keep track of time
    const [time, setTime] = useState(calculatedTime);
    //state to keep track of the current round
    const [currentRound, setCurrentRound] = useState(1);
    //state to determine if the timer is running
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setTime(calculatedTime);
    }, [calculatedTime]);
    
    //handle timer logic
    useEffect(() => {
        let interval;

        //if the timer is running and there is time left, decrease the time by 1 every second
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime(time => time - 1);
            }, 1000);
        }
        //if time runs out and there are more rounds to go, move to the next round, stop timer when all rounds are complete
        else if (isRunning && time === 0) {
            const nextRound = currentRound + 1;
            const totalRounds = parseInt(rounds, 10) || defaultRounds;
            if (nextRound <= totalRounds) {
                setCurrentRound(nextRound);
                setTime(calculatedTime || defaultTime);
            } else {
                setIsRunning(false);
            }
        }

        //clear the interval when the component unmounts or timer stops
        return () => clearInterval(interval);
    }, [isRunning, time, currentRound, rounds, calculatedTime, defaultTime, defaultRounds]);

    //function to start or pause the timer
    const startPauseTimer = () => {
        if (!isRunning && time === 0 && currentRound === (parseInt(rounds, 10) || defaultRounds)) {
            setTime(calculatedTime || defaultTime);
            setCurrentRound(1);
        }
        setIsRunning(!isRunning);
    };

    //function to reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setTime(calculatedTime || defaultTime);
        setCurrentRound(1);
    };

    //function to forward to end of round
    const fastForwardTimer = () => {
        if (currentRound < (parseInt(rounds, 10) || defaultRounds)) {
            setTime(0);
        } else {
            setIsRunning(false);
        }
    };

    //function to end the timer
    const endTimer = () => {
        setTime(0);
        setCurrentRound(parseInt(rounds, 10) || defaultRounds);
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
                Set Rounds:
                <Input type="number" value={rounds} onChange={handleRoundsChange} />
            </Panel>
            <DisplayTime>
                {formatTime(time)}
            </DisplayTime>
            <DisplayRounds text={!isRunning && time === 0 && currentRound === (parseInt(rounds, 10) || defaultRounds) ? `Total Rounds: ${rounds}` : `Round ${currentRound} of ${rounds}`} />
            <Panel className="control-panel">
                <div className="start-button-container">
                    <Button className="button-start" label={isRunning ? "Pause" : "Start"} icon={isRunning ? faPause : faPlay} onClick={startPauseTimer} />
                </div>
                <div className="buttons-container">
                    <Button className="button-reset" label="Reset" icon={faRedo} onClick={resetTimer} />
                    <Button className="button-forward" label="Forward" icon={faForward} onClick={fastForwardTimer} />
                    <Button className="button-end" label="End" icon={faStepForward} onClick={endTimer} />
                </div>
            </Panel>
        </div>
    );
};

export default XY;
