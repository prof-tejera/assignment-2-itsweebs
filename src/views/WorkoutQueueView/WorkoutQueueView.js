import React from 'react';
import { useNavigate } from 'react-router-dom';

const WorkoutQueueView = () => {
  let navigate = useNavigate();

  return (
    <div>
      <h1>Workout Queue</h1>
      {/* other components and logic */}
      <button onClick={() => navigate('/add')}>
        Add Timer
      </button>
      {/* other components and logic */}
    </div>
  );
};

export default WorkoutQueueView;

//map array and display it