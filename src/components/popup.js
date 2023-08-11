import React from "react";

export default function Popup({ isCorrect, turn, solution }) {
  return (
    <div className="popup">
      {isCorrect && (
        <div>
          <h1>You win!!!</h1>
          <p className="solution">{solution}</p>
          <p>You found the answer in {turn} turns :)</p>
          <button
            className="button"
            onClick={function refreshPage() {
              window.location.reload(false);
            }}
          >
            Play Again
          </button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Okay, you lost my dude!!! 🙂</h1>
          <p className="solution">Solution is: {solution}</p>
          <p>Out of turns!! Better luck next time 🙂</p>
          <button
            className="button"
            onClick={function refreshPage() {
              window.location.reload(false);
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
