import React from 'react';

//render a group of radio buttons based on the timerList
const RadioButtons = ({ label, timerList, activeType, onChange }) => {
  return (
    <div id="radio-group">
      <label>{label}</label>
      {timerList.map((timer) => (
        <div key={timer} id="radio">
          <input
            type="radio"
            id={timer}
            name="timerRadio"
            checked={activeType === timer}
            onChange={() => onChange(timer)}
          />
          <label htmlFor={timer}>{timer}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtons;

