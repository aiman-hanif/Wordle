import React, { useCallback, useState, useRef } from "react";
import classNames from "classnames";
enum GuessTypes {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  EXISTS = "exists",
  NONE = "none"
  ,
}
const NUM_GUESSES = 5;
// next todo: figure out input one guess at a time
function App() {
  const name: string = "AIMAN";
  const max_entries = name.length * NUM_GUESSES;
  // read maintains the index for removing characters
  // write maintains the index for writing new characters
  const [focusedInput, setFocusedInput] = useState(0)
  const [currentGuess, setCurrentGuess] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [gameResult, setGameResult] = useState(false);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const [inputGuesses, setInputGuesses] = useState(
    Array.from({ length: NUM_GUESSES }, () =>
      Array.from({ length: name.length }, () => "")
    )
  );
  const [guessStatus, setGuessStatus] = useState(
    Array.from({ length: NUM_GUESSES }, () =>
      Array.from({ length: name.length }, () => GuessTypes.NONE)
    )
  );

  /*
    generate index given a row and column of the grid 
  */
  const generateIndex = (row: number, col: number) => {
    return row * name.length + col;
  };

  // valid inputs are 
  // letters
  // backspace
  // delete
  const isInputValid = (charCode: number) => {
    return (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      charCode === 8 ||
      charCode === 127 ||
      charCode === 69
    );
  };
  const isGuessValid = () => {
    return inputGuesses[currentGuess].join("").length === name.length
  }

  const evaluateGuess = () => {
    const updatedGuessStatus = guessStatus
    inputGuesses[currentGuess].map((letter, index) => {
      if (letter === name.charAt(index)) {
        updatedGuessStatus[currentGuess][index] = GuessTypes.CORRECT
      }
      else if (name.includes(letter)) {
        updatedGuessStatus[currentGuess][index] = GuessTypes.EXISTS
      }
      else {
        updatedGuessStatus[currentGuess][index] = GuessTypes.INCORRECT
      }
    })
    setGuessStatus(updatedGuessStatus)
    const gameWon = updatedGuessStatus[currentGuess].filter(item => item === GuessTypes.CORRECT).length === name.length
    return gameWon
  }
  const handleKeydown = useCallback(
    (code: string, key: string) => {
      // if game is complete then over
      if (gameComplete) {
        return;
      }
      // if the key is invalid then don't do anything
      if (!isInputValid(key.charCodeAt(0))) {
        return;
      }

      if (
        (code === "Backspace" && focusedInput === 0 && inputGuesses[currentGuess][focusedInput] === "") ||
        (code !== "Enter" && code !== "Backspace" && focusedInput === name.length)
      ) {
        return;
      }

      let updatedInput = JSON.parse(JSON.stringify(inputGuesses));
      let newFocusedInput = focusedInput
      let newGuess = currentGuess;
      // if backspace is pressed
      // if input is entered --> read should be the current but write should be the next
      // input is changed at the write index
      // if backspace is pressed --> read index is deleted and write is decremented
      if (code === "Backspace") {
        if (focusedInput !== 0) {
          newFocusedInput -= 1
          setFocusedInput(newFocusedInput);
        }
        if (inputGuesses[currentGuess][focusedInput] !== "") {
          updatedInput[currentGuess][focusedInput] = "";
        }
        else {
          updatedInput[currentGuess][focusedInput - 1] = "";
        }
        setInputGuesses(updatedInput);

      }
      else if (code === "Enter") {
        if (!isGuessValid()) {
          alert("Guess is not valid")
          return
        }
        const gameResult = evaluateGuess();
        setGameResult(gameResult)
        const message = `Game won at ${currentGuess + 1} attempt${currentGuess > 0 ? 's' : ''}!`
        if (gameResult) {
          setGameComplete(true);
          alert(message)
          return;
        }
        console.log(guessStatus)
        newGuess += 1
        setCurrentGuess(newGuess);
        if (newGuess === NUM_GUESSES) {
          setGameComplete(true)
          alert("Game is over...")
          return;
        }
        newFocusedInput = 0
        setFocusedInput(newFocusedInput)
      }
      else {
        if (focusedInput !== name.length - 1) {
          setFocusedInput(focusedInput + 1);
        }
        updatedInput[currentGuess][focusedInput] = key.toUpperCase();
        setInputGuesses(updatedInput);
      }
    },
    [focusedInput, inputGuesses, max_entries]
  );

  const renderInput = (row: number) => {
    return (
      <div className="flex gap-2">
        {name.split("").map((_, index) => {
          const isCorrect = guessStatus[row][index] === GuessTypes.CORRECT
          const isPresent = guessStatus[row][index] === GuessTypes.EXISTS
          const isAbsent = guessStatus[row][index] === GuessTypes.INCORRECT
          const isNone = guessStatus[row][index] === GuessTypes.NONE
          return (
            <input
              onKeyDown={(e) => handleKeydown(e.code, e.key)}
              ref={(item) => {
                inputRef.current[generateIndex(row, index)] = item;
              }}
              readOnly={currentGuess !== row || focusedInput !== index}
              maxLength={1}
              type="text"
              value={inputGuesses[row][index] ? inputGuesses[row][index] : ""}
              className={classNames("caret-transparent text-md text-default-text border border-default-secondary text-center size-tile-md focus:outline-none transition-all", { "bg-correct": isCorrect, "bg-present": isPresent, "bg-absent": isAbsent, "bg-default-background": isNone })}
              key={index}
              disabled={gameComplete}
            ></input>
          )
        })}
      </div>
    );
  };
  // row - 1
  // col - 0
  // index - 13
  const renderGuesses = () => {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: NUM_GUESSES }, (_, rowIndex) => (
          <div>{renderInput(rowIndex)}</div>
        ))}
      </div>
    );
  };
  return (
    <div className="bg-default-background w-full h-screen flex items-center justify-center">
      {renderGuesses()}
    </div>
  );
}

export default App;
