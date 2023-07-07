"use client";

import React, { useState, useEffect } from "react";

const SessionTimer: React.FC = () => {
  const [sessionLength, setSessionLength] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [ringtone, setRingtone] = useState<HTMLAudioElement | null>(null);

  const sessionDuration: number = 1; // Session duration in minutes
  const breakDuration: number = 1; // Break duration in minutes
  const maxSessionLength: number = 240; // Maximum session length in minutes

  useEffect(() => {
    if (timerActive) {
      const timer: NodeJS.Timeout = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timerActive]);

  useEffect(() => {
    if (timeRemaining === 0) {
      playRingtone();
      if (sessionLength === "0") {
        stopTimer();
      } else {
        startBreak();
      }
    }
  }, [timeRemaining]);

  const playRingtone = (): void => {
    if (ringtone) {
      ringtone.play();
    }
  };

  const startTimer = (): void => {
    const parsedSessionLength: number = parseInt(sessionLength, 10);
    if (isNaN(parsedSessionLength) || parsedSessionLength <= 0) {
      return;
    }

    const clampedSessionLength: number = Math.min(
      Math.max(parsedSessionLength, 1),
      maxSessionLength
    );

    setTimeRemaining(clampedSessionLength * 60); // Convert minutes to seconds
    setSessionLength(clampedSessionLength.toString());
    setTimerActive(true);
  };

  const startBreak = (): void => {
    setTimeRemaining(breakDuration * 60); // Convert minutes to seconds
    setSessionLength("0");
    setTimerActive(true);
  };

  const stopTimer = (): void => {
    setTimerActive(false);
    setSessionLength("");
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes: number = Math.floor(timeInSeconds / 60);
    const seconds: number = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateBreaks = (sessionLength: string): number => {
    const parsedSessionLength: number = parseInt(sessionLength, 10);
    const totalSessions: number = Math.floor(parsedSessionLength / sessionDuration);
    const totalBreaks: number = totalSessions > 0 ? totalSessions - 1 : 0;
    return totalBreaks;
  };

  const handleSessionLengthChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSessionLength(e.target.value);
  };

  useEffect(() => {
    const audio = new Audio("/music/ring1.wav");
    audio.addEventListener("ended", () => {
      audio.currentTime = 0; // Reset the audio to the beginning
    });
    setRingtone(audio);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Get Ready Focus Session</h2>
      {!timerActive ? (
        <div className="flex items-center mb-4">
          <label htmlFor="sessionLength" className="mr-2">
            Session Length (minutes):
          </label>
          <input
            type="number"
            id="sessionLength"
            value={sessionLength}
            min={10}
            max={maxSessionLength}
            onChange={handleSessionLengthChange}
            className="border border-gray-300 p-2 w-24"
          />
        </div>
      ) : (
        <div className="text-3xl font-bold mb-4">{formatTime(timeRemaining)}</div>
      )}
      {!timerActive && sessionLength && (
        <div className="text-gray-600 mb-4">
          {`Total breaks: ${calculateBreaks(sessionLength)}`}
        </div>
      )}
      <div className="flex space-x-4">
        {!timerActive ? (
          <button
            onClick={startTimer}
            disabled={!sessionLength}
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
              !sessionLength ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Start
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionTimer;
