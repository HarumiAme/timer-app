import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' }); // Empty default values
  const [timerRunning, setTimerRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (timerRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0 && timerRunning) {
      clearInterval(interval);
      playSound();
      setTimerRunning(false);
    }

    return () => clearInterval(interval);
  }, [timerRunning, remainingTime]);

  const playSound = () => {
    const audio = new Audio('/sound.mp3'); // Make sure your sound file is placed correctly
    audio.play();
  };

  const handleStart = () => {
    const totalTime =
      Number(time.hours) * 3600 + Number(time.minutes) * 60 + Number(time.seconds);

    // Check if all fields are filled (not empty) before starting the timer
    if (time.hours === '' && time.minutes === '' && time.seconds === '') {
      return; // Do nothing if all fields are empty
    }

    // Only proceed if total time is greater than 0
    if (totalTime > 0) {
      setRemainingTime(totalTime);
      setTimerRunning(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Make sure the values can't be negative
    if (value >= 0) {
      setTime((prevTime) => ({
        ...prevTime,
        [name]: value,
      }));
    }
  };

  const handleReset = () => {
    // Reload the page to reset the timer
    window.location.reload();
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Apply the "flash" class if remaining time is less than 10 seconds
  const timeDisplayClass = remainingTime <= 10 && remainingTime > 0 ? 'time-display flash' : 'time-display';

  return (
    <div>
      <h2>Ajustar temporizador</h2>
      <div className="input-container">
        <input
          type="number"
          name="hours"
          placeholder="HH"
          value={time.hours}
          min="0" // Prevent negative input
          onChange={handleChange}
        />
        <input
          type="number"
          name="minutes"
          placeholder="MM"
          value={time.minutes}
          min="0" // Prevent negative input
          onChange={handleChange}
        />
        <input
          type="number"
          name="seconds"
          placeholder="SS"
          value={time.seconds}
          min="0" // Prevent negative input
          onChange={handleChange}
        />
      </div>
      <button onClick={handleStart} disabled={timerRunning} style={{ marginBottom: '10px' }}>
        Empezar
      </button>
      {/* Reset Button with Red Background */}
      <button 
        onClick={handleReset} 
        style={{ 
          marginLeft: '10px', 
          backgroundColor: 'red', 
          color: 'white', 
          border: 'none', 
          padding: '10px 20px', 
          cursor: 'pointer'
        }}
      >
        Reiniciar
      </button>
      <div className={timeDisplayClass}>
        Tiempo restante: {formatTime(remainingTime)}
      </div>
    </div>
  );
};

export default Timer;