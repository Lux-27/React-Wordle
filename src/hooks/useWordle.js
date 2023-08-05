import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  //tracks current guess, updates everytime the user enters something
  const [currentGuess, setCurrentGuess] = useState("");

  //each guess is an array of letters
  const [guesses, setGuesses] = useState([]);

  //each guess is a string, used to check duplicate guesses submitted by user
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  //format a guess into an array of letter objects
  //eg. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {};

  //add a new guess to the guess state
  //update the isCorrect state if the guess is correct
  //add one to the turn state
  const addNewGuess = () => {};

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = () => {};

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
