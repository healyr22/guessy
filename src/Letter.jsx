import React from "react";

function Letter({ value, ...props }) {
  var color = "black";
  var word = props.word.toUpperCase();
  var submitted = props.submitted;
  var letterIndex = props.index;

  if (submitted) {
    if (word[letterIndex] === value) {
      // Letter correct?
      color = "green";
    } else if (word.indexOf(value) !== -1) {
      // Letter present?
      color = "orange";
    }
  }

  return (
    <div className={`Letter `} {...props} style={{ background: color }}>
      <div className="LetterInside">{value}</div>
    </div>
  );
}

export default Letter;
