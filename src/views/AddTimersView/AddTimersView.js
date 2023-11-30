import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import TimerContext from '../../context/TimerContext';
import RadioButtons from '../../components/generic/RadioButton';
import Panel from '../../components/generic/Panel/Panel';
import Input from '../../components/generic/Input/Input';
import useTimeInput from '../../hooks/useTimeInput';
import useRoundsInput from '../../hooks/useRoundsInput';

const AddTimerView = () => {
  //using dispatch from TimerContext for state updates
  const { dispatch } = useContext(TimerContext);
  //state to track the selected timer type, defaulted to stopwatch
  const [activeType, setActiveType] = useState("Stopwatch");
  //utilizing custom hooks for handling input fields
  const { inputMinutes, inputSeconds, handleMinutesChange, handleSecondsChange } = useTimeInput('01', '30');
  //separate instance for handling rest time in Tabata timer
  const { inputMinutes: restMinutes, inputSeconds: restSeconds, handleMinutesChange: handleRestMinutesChange, handleSecondsChange: handleRestSecondsChange } = useTimeInput('00', '20');
  //utilizing custom hook for handling rounds input for Tabata and XY
  const { rounds, handleRoundsChange } = useRoundsInput('8');

  //available timers
  const Timers = ["Stopwatch", "Countdown", "XY", "Tabata"];

  //handle timer type selection changes
  const handleTypeChange = (type) => {
    setActiveType(type);
  };

  //add the configured timer to the global state
  const addTimer = () => {
    const timerConfig = {
      type: activeType,
      minutes: activeType === "Tabata" ? undefined : inputMinutes,
      seconds: activeType === "Tabata" ? undefined : inputSeconds,
      workMinutes: activeType === "Tabata" ? inputMinutes : undefined,
      workSeconds: activeType === "Tabata" ? inputSeconds : undefined,
      restMinutes: activeType === "Tabata" ? restMinutes : undefined,
      restSeconds: activeType === "Tabata" ? restSeconds : undefined,
      rounds: activeType === "Tabata" || activeType === "XY" ? rounds : undefined,
    };

    dispatch({
      type: 'ADD_TIMER',
      payload: timerConfig,
    });
  };

  //flag to conditionally render Tabata-specific input fields
  const isTabata = activeType === "Tabata";

  //show rounds input if Tabata or XY are selected
  const showRoundsInput = activeType === "Tabata" || activeType === "XY";

  return (
    <Panel>
      <h1>Add Timer</h1>
      <RadioButtons label="Select a timer" timerList={Timers} handleClick={handleTypeChange} />

      <Panel>
        {isTabata && (
          <>
            Set Work Time:
            <div className="input-container">
              <Input type="number" label="Work Minutes" value={inputMinutes} onChange={handleMinutesChange} />
              <Input type="number" label="Work Seconds" value={inputSeconds} onChange={handleSecondsChange} />
            </div>
            Set Rest Time:
            <div className="input-container">
              <Input type="number" label="Rest Minutes" value={restMinutes} onChange={handleRestMinutesChange} />
              <Input type="number" label="Rest Seconds" value={restSeconds} onChange={handleRestSecondsChange} />
            </div>
          </>
        )}
        {!isTabata && (
          <>
            Set Time:
            <div className="input-container">
              <Input type="number" label="Minutes" value={inputMinutes} onChange={handleMinutesChange} />
              <Input type="number" label="Seconds" value={inputSeconds} onChange={handleSecondsChange} />
            </div>
          </>
        )}
        {showRoundsInput && (
          <div className="input-container">
            Set Rounds:
            <Input type="number" label="Rounds" value={rounds} onChange={handleRoundsChange} />
          </div>
        )}
      </Panel>

      <button onClick={addTimer}>Add Timer</button>
      <Link to="/" className="home-link">Back to Workout Queue</Link>
    </Panel>
  );
};

export default AddTimerView;
