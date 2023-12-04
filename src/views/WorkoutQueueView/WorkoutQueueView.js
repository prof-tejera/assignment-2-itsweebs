import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimerContext from '../../context/TimerContext';
import Panel from '../../components/generic/Panel/Panel';
import { formatTime } from '../../utils/helpers';
import DisplayTime from '../../components/generic/DisplayTime/DisplayTime';
import DisplayText from '../../components/generic/DisplayText/DisplayText';
import Button from '../../components/generic/Button/Button';
import { faPlay, faPause, faRedo, faStepForward, faStop, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './WorkoutQueueView.css'

const WorkoutQueueView = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(TimerContext);
  const [initialTotalTime, setInitialTotalTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  //calculate initial total workout time based on timers in the queue
  useEffect(() => {
    const total = state.timers.reduce((acc, timer) => {
      let timerSeconds = 0;
      switch (timer.type) {
        case 'Countdown':
        case 'Stopwatch':
          //simple calculation for timers with minutes and seconds
          timerSeconds = (parseInt(timer.minutes, 10) * 60) + parseInt(timer.seconds, 10);
          break;
        case 'XY':
          //for XY timer, multiply the time by the number of rounds
          timerSeconds = ((parseInt(timer.minutes, 10) * 60) + parseInt(timer.seconds, 10)) * parseInt(timer.rounds, 10);
          break;
        case 'Tabata':
          //for Tabata, calculate work and rest time separately and multiply by rounds
          const workTime = (parseInt(timer.workMinutes, 10) * 60) + parseInt(timer.workSeconds, 10);
          const restTime = (parseInt(timer.restMinutes, 10) * 60) + parseInt(timer.restSeconds, 10);
          timerSeconds = (workTime + restTime) * parseInt(timer.rounds, 10);
          break;
        default:
          break;
      }
      return acc + timerSeconds;
    }, 0);
    setInitialTotalTime(total);
    setRemainingTime(total);
  }, [state.timers]);

  //update remaining time if workout is running
  useEffect(() => {
    let interval;
    if (state.isWorkoutRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0 && state.isWorkoutRunning) {
      //stop the workout if time runs out
      dispatch({ type: 'END_WORKOUT' });
    }
    return () => clearInterval(interval);
  }, [state.isWorkoutRunning, remainingTime, dispatch]);

  //remove a timer from the workout queue
  const removeTimer = (id) => {
    dispatch({ type: 'REMOVE_TIMER', payload: id });
  };

  //global controls
  const handlePauseResume = () => {
    dispatch({ type: 'TOGGLE_WORKOUT' });
  };
  const handleReset = () => {
    dispatch({ type: 'RESET_WORKOUT' });
    setRemainingTime(initialTotalTime);
  };
  const handleFastForward = () => {
    dispatch({ type: 'NEXT_TIMER' });
  };
  const handleEndWorkout = () => {
    dispatch({ type: 'END_WORKOUT' });
    setRemainingTime(0);
  };

  return (
    <div className="container">
      <div className="workout">
        <text className="workout-title">Workout</text>
        <DisplayTime className={state.isWorkoutComplete ? 'time-finished' : ''}>
          {formatTime(remainingTime)}
        </DisplayTime>
        <DisplayText text={!state.isWorkoutRunning && remainingTime === 0 && state.timers.length > 0 ? 'Done!' : ''} />
        <Panel className="control-panel">
          <div className="start-button-container">
            <Button className="button-start" label={state.isWorkoutRunning ? "Pause" : "Start"} icon={state.isWorkoutRunning ? faPause : faPlay} onClick={handlePauseResume} disabled={state.isWorkoutComplete} />
          </div>
          <div className="buttons-container">
            <Button className="button-reset" label="Reset" icon={faRedo} onClick={handleReset} disabled={state.isWorkoutComplete} />
            <Button className="button-forward" label="Forward" icon={faStepForward} onClick={handleFastForward} disabled={state.isWorkoutComplete} />
            <Button className="button-end" label="End" icon={faStop} onClick={handleEndWorkout} disabled={state.isWorkoutComplete} />
          </div>
        </Panel>
      </div>
      <h2>Workout Queue</h2>
      {
    state.timers.map((timer) => (
      <div key={timer.id} className="timer-item">
        <div className="timer-info">
          <div className="timer-type">{timer.type}</div>
          <div className="timer-details">
            {timer.type !== 'Tabata' && (
              <span>{timer.minutes}:{(timer.seconds ?? '0').toString().padStart(2, '0')}</span>
            )}
            {timer.type === 'Tabata' && (
              <>
                <span>Work: {timer.workMinutes}:{timer.workSeconds.padStart(2, '0')}</span>
                <span>Rest: {timer.restMinutes}:{timer.restSeconds.padStart(2, '0')}</span>
              </>
            )}
            {timer.rounds && <span>Rounds: {timer.rounds}</span>}
          </div>
        </div>
        <Button className="button-remove" icon={faTrashAlt} onClick={() => removeTimer(timer.id)} />
      </div>
    ))
  }
  <Button className="button-add" label="Add Timer" onClick={() => navigate('/add')} />
    </div >
  );
};

export default WorkoutQueueView;
