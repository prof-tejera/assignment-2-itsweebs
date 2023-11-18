import React from 'react';
import "./DisplayText.css";

const DisplayText = ({ text }) => {
  return (
    <div className='additional-text'>
      {text}
    </div>
  );
};

export default DisplayText;