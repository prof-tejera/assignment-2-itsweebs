import React from 'react';
import "./DisplayRounds.css";

const DisplayRounds = ({ text, ...props }) => {
  return (
    <div className='display-rounds'>
      {text}
    </div>
  );
};

export default DisplayRounds;