import React from "react";

import "./index.css";
import LetterRow from "./LetterRow";

const WORD_LENGTH = 5;
const NUM_GUESSES = 6;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.GuessInputField = React.createRef();
  }
  initGuesses() {
    var guesses = [];
    for(var i = 0; i < NUM_GUESSES; i++) {
      guesses.push(this.fillEmptySpaces(""));
    }
    return guesses;
  }
  state = {
    guesses: this.initGuesses(),
    currentGuessIndex: 0,
    word: "taken",
    isGameOver: false
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
          submitted={id !== this.state.currentGuessIndex || this.isGameOver()}
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
            maxLength={WORD_LENGTH}
            onChange={this.updateGuess}
            onKeyPress={this.handleKeypress}
            style={{ marginLeft: "5px", marginRight: "5px" }}
            disabled={this.isGameOver()}
          />
        </label>
        <input
          className="GuessButton"
          type="button"
          value="Enter"
          onClick={this.guess}
          disabled={this.isGameOver() || this.currentGuess().trim().length !== WORD_LENGTH}
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
    var currentGuessIndex = this.state.currentGuessIndex;
    
    if(this.currentGuess().toUpperCase() === this.state.word.toUpperCase()) {
      // WINNER!
      this.setState((prevState) => ({
        ...prevState,
        isGameOver: true
      }));
      alert("Congrats, you won! It took " + (currentGuessIndex+1) + " guesses.");
    } else if(currentGuessIndex === NUM_GUESSES-1) {
      // loser...
      this.setState((prevState) => ({
        ...prevState,
        isGameOver: true
      }));
      alert("WOMP WOMP!? Out of guesses my friend.");
    } else {
      // Continue
      this.setState((prevState) => ({
        ...prevState,
        currentGuessIndex: currentGuessIndex + 1
      }));
      this.GuessInputField.current.value = "";
    }
  };
  
  handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13 && this.currentGuess().trim().length === WORD_LENGTH) {
      this.guess();
    }
  };

  fillEmptySpaces(word) {
    var requiredSpaces = WORD_LENGTH - word.length;
    var filledWord = word;
    for (var i = 0; i < requiredSpaces; i++) {
      filledWord += " ";
    }
    return filledWord;
  };

  isPlayerAWinner() {
    var currentIndex = this.state.currentGuessIndex;
    if(currentIndex === 0) {
      return false;
    }

    var mostRecentGuess = this.state.guesses[currentIndex-1];
    return mostRecentGuess.toUpperCase() === this.state.word.toUpperCase();
  };

  isGameOver() {
    return this.state.isGameOver;
  };
}

export default App;
