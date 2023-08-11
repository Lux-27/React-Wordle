import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);

  //tracks current guess, updates everytime the user enters something
  const [currentGuess, setCurrentGuess] = useState("");

  //each guess is an array of letters
  const [guesses, setGuesses] = useState([...Array(6)]);

  //each guess is a string, used to check duplicate guesses submitted by user
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // looks like {a: "gray", b: "yellow", c: "green"}

  //format a guess into an array of letter objects
  //eg. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArr = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "gray" };
    });

    //find green letters (correct guess letters)
    formattedGuess.forEach((letter, i) => {
      if (solutionArr[i] === letter.key) {
        formattedGuess[i].color = "green";
        solutionArr[i] = null; //green cannot be rematched to yellow
      }
    });

    //find yellow letters (correct guess letters, wrong position)
    formattedGuess.forEach((letter, i) => {
      if (solutionArr.includes(letter.key) && letter.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArr[solutionArr.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  //add a new guess to the guess state
  //update the isCorrect state if the guess is correct
  //add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };
      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key];

        if (letter.color === "green") {
          newKeys[letter.key] = "green";
          return;
        }
        if (letter.color === "yellow" && currentColor !== "green") {
          newKeys[letter.key] = "yellow";
          return;
        }
        if (
          letter.color === "gray" &&
          currentColor !== "yellow" &&
          currentColor !== "yellow"
        ) {
          newKeys[letter.key] = "gray";
          return;
        }
      });
      return newKeys;
    });
    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      // add guess conditions
      // only add guess if turn < 5
      if (turn > 5) {
        console.log("out of guesses");
        return;
      }

      // word does not exist in history, do not allow duplicates
      if (history.includes(currentGuess)) {
        console.log("word already tried");
        return;
      }

      //length of current guess != 5
      if (currentGuess.length !== 5) {
        console.log("Word must be 5 letters long");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
