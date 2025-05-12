import { keyboardKey } from '@testing-library/user-event';
import React, {useCallback, useState, useRef} from 'react';

function App() {
  const name = "Aiman";
  const numGuesses = 5;
  const [focusedInput, setFocusedInput] = useState(0);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const generateIndex = (row: number, col: number) => {
    return row*name.length + col;
  }
  const handleInput = useCallback(() => {
    const newFocusedIndex = focusedInput + 1
    setFocusedInput(newFocusedIndex);
    inputRef.current[newFocusedIndex]?.focus()
  }, [generateIndex])
  
  const handleKeydown = useCallback((key: keyboardKey) => {
    if (key.keyCode === 8 && focusedInput !== 0) {
      const newFocusedIndex = focusedInput - 1
      console.log(focusedInput)
      console.log(newFocusedIndex)
      setFocusedInput(newFocusedIndex);
      inputRef.current[newFocusedIndex]?.focus()
    }
  }, [generateIndex, focusedInput])
  
  const renderInput = (row: number) => {
    return (
      <div className="flex gap-2">
      {name.split('').map((_, index) => (
        <input onKeyDown={(key) => handleKeydown(key)} ref={(item) => {inputRef.current[generateIndex(row,index)] = item}} onChange={handleInput} disabled={generateIndex(row, index) !== focusedInput} maxLength={1} type="text" className="text-md bg-default-background text-default-text border border-default-secondary focus:outline-default-accent text-center size-tile-md" key={index}></input>
      ))}
      </div>
    )
  }
  // row - 1
  // col - 0
  // index - 13
  const renderGuesses = () => {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({length: numGuesses}, (_, rowIndex) => (
          <div>
            {renderInput(rowIndex)}
          </div>
        ))}
      </div>
      
    )
  }
  return (
    <div className="bg-default-background w-full h-screen flex items-center justify-center">
      {renderGuesses()}
    </div>
  );
}

export default App;
