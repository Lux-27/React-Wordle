import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./grid";
import Keypad from "./keypad";
import Popup from "./popup";

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowPopup(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => setShowPopup(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  // useEffect(() => {
  //   console.log(guesses, turn, isCorrect);
  // }, [guesses, turn, isCorrect]);

  return (
    <div>
      {/* <div>solution - {solution}</div> */}
      {/* <div>current guess : {currentGuess}</div> */}
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showPopup && (
        <Popup isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  );
}
