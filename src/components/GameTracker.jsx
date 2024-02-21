import { useState, useEffect, useRef } from "react";

const GameTracker = () => {
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // Start timer on first keypress
    const handleKeyPress = (event) => {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    // Update elapsed time every second
    const interval = setInterval(() => {
      if (startTimeRef.current) {
        setElapsedTime(Date.now() - startTimeRef.current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Update score when passed as a prop
  const handleScoreUpdate = () => setScore(score + 1);

  return (
    <div>
      <p>Score: {score}</p>
      <p>Elapsed Time: {elapsedTime / 1000} seconds</p>
      {/* Pass handleScoreUpdate to other components where needed */}
    </div>
  );
};

export default GameTracker;