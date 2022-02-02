import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import LetterRow from "./LetterRow";

const LENGTH = 5;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.GuessInputField = React.createRef();
  }
  state = {
    guesses: ["     ", "     ", "     ", "     ", "     ", "     "],
    currentGuessIndex: 0,
    word: "hello"
  };

  currentGuess() {
    var guesses = this.state.guesses;
    return guesses[this.state.currentGuessIndex];
  }

  render() {
    var rows = this.state.guesses.map((data, id) => {
      return (
        <LetterRow
          guess={data}
          word={this.state.word}
          submitted={id !== this.state.currentGuessIndex}
        />
      );
    });
    return (
      <div className="App">
        {rows}
        <label>
          Guess:
          <input
            className="GuessInput"
            ref={this.GuessInputField}
            type="text"
            maxLength={LENGTH}
            onChange={this.updateGuess}
            onKeyPress={this.handleKeypress}
            style={{ marginLeft: "5px", marginRight: "5px" }}
          />
        </label>
        <input
          className="GuessButton"
          type="button"
          value="Enter"
          onClick={this.guess}
          disabled={this.currentGuess().trim().length !== 5}
        />
      </div>
    );
  }

  updateGuess = (event) => {
    var guess = event.target.value;
    var guesses = this.state.guesses;
    var currentGuessIndex = this.state.currentGuessIndex;
    guesses[currentGuessIndex] = this.fillEmptySpaces(guess);
    this.setState((prevState) => ({
      ...prevState,
      guesses: guesses
    }));
  };

  guess = () => {
    // var guesses = this.state.guesses;
    // guesses.push("     ");
    // this.setState((prevState) => ({ guesses: guesses }));
    var currentGuessIndex = this.state.currentGuessIndex;
    this.setState((prevState) => ({
      ...prevState,
      currentGuessIndex: currentGuessIndex + 1
    }));
    this.GuessInputField.current.value = "";
  };
  
  handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13 && this.currentGuess().trim().length === 5) {
      this.guess();
    }
  };

  fillEmptySpaces(word) {
    var requiredSpaces = LENGTH - word.length;
    var filledWord = word;
    for (var i = 0; i < requiredSpaces; i++) {
      filledWord += " ";
    }
    return filledWord;
  }
}

export default App;
