import React from "react";

import Letter from "./Letter";

class LetterRow extends React.Component {
  render() {
    var letters = this.props.guess.split("");
    var components = letters.map((data, id) => {
      return (
        <Letter
          value={data.toUpperCase()}
          index={id}
          word={this.props.word}
          submitted={this.props.submitted}
        />
      );
    });
    return <div className="LetterContainer">{components}</div>;
  }
}

export default LetterRow;
