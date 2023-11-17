import { useState, useEffect } from "react";
import Panel from "../generic/Panel.js";
import Input from "../generic/Input.js";
import Button from "../generic/Button.js";
import DisplayTime from "../generic/DisplayTime.js";
import DisplayRounds from "../generic/DisplayRounds.js";
import { formatTime } from "../../utils/helpers.js";
import { faPlay, faPause, faRedo, faForward, faStepForward } from '@fortawesome/free-solid-svg-icons';


const XY = () => {
    //define default values
    const defaultTime = 90;
    const defaultRounds = 10;

    //state to keep track of time in seconds
    const [time, setTime] = useState(defaultTime);
    //state to keep track of user input in MM:SS format
    const [inputTime, setInputTime] = useState('01:30');
    //state to keep track of the total number of rounds
    const [rounds, setRounds] = useState(defaultRounds.toString());
    //state to keep track of the current round
    const [currentRound, setCurrentRound] = useState(1);
    //state to determine if the timer is running
    const [isRunning, setIsRunning] = useState(false);

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
                setTime(parseTime(inputTime) || defaultTime);
            } else {
                setIsRunning(false);
            }
        }

        //clear the interval when the component unmounts or timer stops
        return () => clearInterval(interval);
    }, [isRunning, time, currentRound, rounds, inputTime, defaultTime, defaultRounds]);

    //function to start or pause the timer
    const startPauseTimer = () => {
        if (!isRunning && time === 0 && currentRound === (parseInt(rounds, 10) || defaultRounds)) {
            setTime(parseTime(inputTime) || defaultTime);
            setCurrentRound(1);
        }
        setIsRunning(!isRunning);
    };

    //function to reset the timer
    const resetTimer = () => {
        setIsRunning(false);
        setTime(parseTime(inputTime) || defaultTime);
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

    //function to parse MM:SS time format to seconds
    const parseTime = (input) => {
        const [minutes = '0', seconds = '0'] = input.split(':');
        return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    };

    //handle changes in X input
    const handleTimeChange = (e) => {
        const value = e.target.value;
        const segments = value.split(':');
        if (segments.length <= 2) {
            const minSegment = segments[0];
            const secSegment = segments[1] || '';
            if (minSegment.length <= 2 && secSegment.length <= 2) {
                setInputTime(value);
            }
        }
        //check if input is empty and default to '00:00'
        else if (!value) {
            setInputTime('00:00');
        }
    };

    //handle changes in Y input (rounds)
    const handleRoundsChange = (e) => {
        const value = e.target.value;
        setRounds(value);
        if (value === '') {
            setCurrentRound(1);
        }
    };

    //render timer and control buttons
    return (
        <div>
            <Panel>
                <Input label="Set Time" value={inputTime} onChange={handleTimeChange} />
                <Input label="Set Rounds" value={rounds} onChange={handleRoundsChange} />
            </Panel>
            <DisplayTime>
                {formatTime(time)}
            </DisplayTime>
            <DisplayRounds text={!isRunning && time === 0 && currentRound === (parseInt(rounds, 10) || defaultRounds) ? `Total Rounds: ${parseInt(rounds, 10) || defaultRounds}` : `Round ${currentRound} of ${parseInt(rounds, 10) || defaultRounds}`} />
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
