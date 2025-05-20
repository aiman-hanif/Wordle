import React, { useCallback, useState, useRef, KeyboardEvent } from "react";

function App() {
  const name = "Aiman";
  const NUM_GUESSES = 5;
  const max_entries = name.length * NUM_GUESSES;
  const [focusedInput, setFocusedInput] = useState({ read: -1, write: 0 });
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const [inputGuesses, setInputGuesses] = useState(
    Array.from({ length: NUM_GUESSES }, () =>
      Array.from({ length: name.length }, () => "")
    )
  );

  /*
    generate index given a row and column of the grid 
  */
  const generateIndex = (row: number, col: number) => {
    return row * name.length + col;
  };

  const generateRowCol = (index: number) => {
    const row = Math.floor(index / NUM_GUESSES);
    const col = index % NUM_GUESSES;
    return { row, col };
  };
  const isInputValid = (charCode: number) => {
    return (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) ||
      charCode === 8 ||
      charCode === 127
    );
  };
  const handleKeydown = useCallback(
    (code: string, key: string) => {
      if (!isInputValid(key.charCodeAt(0))) {
        return;
      }
      if (
        (code === "Backspace" && focusedInput["read"] === -1) ||
        (code !== "Backspace" && focusedInput["write"] === max_entries)
      ) {
        return;
      }
      const updatedInput = JSON.parse(JSON.stringify(inputGuesses));
      const newFocusedInput = { read: 0, write: 0 };

      // if backspace is pressed
      // if input is entered --> read should be the current but write should be the next
      // input is changed at the write index
      // if backspace is pressed --> read index is deleted and write is decremented
      if (code === "Backspace") {
        const { row, col } = generateRowCol(focusedInput.read);
        newFocusedInput["read"] = focusedInput.read - 1;
        newFocusedInput["write"] = focusedInput.write - 1;

        updatedInput[row][col] = "";
      } else {
        const { row, col } = generateRowCol(focusedInput.write);
        newFocusedInput["read"] = focusedInput.read + 1;
        newFocusedInput["write"] = focusedInput.write + 1;
        updatedInput[row][col] = key.toUpperCase();
      }
      setInputGuesses(updatedInput);
      setFocusedInput(newFocusedInput);
      inputRef.current[newFocusedInput.write]?.focus();
    },
    [focusedInput, inputGuesses, max_entries]
  );

  const renderInput = (row: number) => {
    return (
      <div className="flex gap-2">
        {name.split("").map((_, index) => (
          <input
            onKeyDown={(e) => handleKeydown(e.code, e.key)}
            ref={(item) => {
              inputRef.current[generateIndex(row, index)] = item;
            }}
            readOnly={generateIndex(row, index) !== focusedInput.write}
            maxLength={1}
            type="text"
            value={inputGuesses[row][index] ? inputGuesses[row][index] : ""}
            className="text-md bg-default-background text-default-text border border-default-secondary focus:outline-default-accent text-center size-tile-md"
            key={index}
          ></input>
        ))}
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
