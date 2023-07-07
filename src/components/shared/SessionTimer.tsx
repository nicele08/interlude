"use client";

import { SessionTimerConfig } from "@/types/setting.type";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SessionTimer = ({ config }: { config: SessionTimerConfig }) => {
  const router = useRouter();
  const [sessionDuration, setSessionDuration] = useState<number>(
    config.sessionDuration || 25
  );
  const [sessionLength, setSessionLength] = useState<string>(
    config.sessionLength.toString() || "25"
  );
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<string>("");
  const [currentPhaseNumber, setCurrentPhaseNumber] = useState<number>(1);
  const [ringtone, setRingtone] = useState<HTMLAudioElement | null>(null);

  const breakDuration: number = config.breakDuration || 5;
  const maxSessionLength: number = 240;

  useEffect(() => {
    if (config.sessionLength) {
      setSessionLength(config.sessionLength.toString());
    }

    if (config.sessionDuration) {
      setSessionDuration(config.sessionDuration);
    }
  }, [config]);

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
      if (currentPhase === "session") {
        if (sessionLength === "0") {
          stopTimer();
        } else {
          startBreak();
        }
      } else if (currentPhase === "break") {
        startSession();
      }
    }
  }, [timeRemaining]);

  const playRingtone = (): void => {
    if (ringtone) {
      if (currentPhase === "session" && config.endOfSessionSound) {
        ringtone.src = config.endOfSessionSound;
      } else if (currentPhase === "break" && config.endOfBreakSound) {
        ringtone.src = config.endOfBreakSound;
      }

      if (ringtone.src) {
        ringtone.play();
      }
    }
  };

  const changeSessionLength = async (duration: number) => {
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionLength: duration,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const startTimer = (): void => {
    const parsedSessionLength: number = parseInt(sessionLength, 10);
    if (isNaN(parsedSessionLength) || parsedSessionLength <= 0) {
      return;
    }

    const clampedSessionLength: number = Math.min(
      Math.max(parsedSessionLength, 10),
      maxSessionLength
    );

    changeSessionLength(clampedSessionLength);

    setTimeRemaining(clampedSessionLength * 60);
    setSessionLength(clampedSessionLength.toString());
    setCurrentPhase("session");
    setCurrentPhaseNumber(1);
    setTimerActive(true);
  };

  const startSession = (): void => {
    setTimeRemaining(sessionDuration * 60);
    setSessionLength("");
    setCurrentPhase("session");
    setCurrentPhaseNumber((prevNumber) => prevNumber + 1);
    setTimerActive(true);
  };

  const startBreak = (): void => {
    setTimeRemaining(breakDuration * 60);
    setCurrentPhase("break");
    setCurrentPhaseNumber((prevNumber) => prevNumber + 1);
    setTimerActive(true);
  };

  const stopTimer = (): void => {
    router.refresh();
    setTimerActive(false);
    setCurrentPhase("");
    setCurrentPhaseNumber(1);
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
    const totalSessions: number = Math.floor(
      parsedSessionLength / sessionDuration
    );
    const totalBreaks: number = totalSessions > 0 ? totalSessions - 1 : 0;
    return totalBreaks;
  };

  const handleSessionLengthChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSessionLength(e.target.value);
  };

  useEffect(() => {
    const audio = new Audio();
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
        <div className="text-3xl font-bold mb-4">
          {formatTime(timeRemaining)}{" "}
          {currentPhase && currentPhaseNumber && (
            <span>
              - {currentPhase === "session" ? "Session" : "Break"}{" "}
              {currentPhaseNumber}
            </span>
          )}
        </div>
      )}
      {!timerActive && sessionLength && (
        <div className="text-gray-600 mb-4">
          {`Total ${
            currentPhase === "session" ? "Breaks" : "Sessions"
          }: ${calculateBreaks(sessionLength)}`}
        </div>
      )}
      <div className="flex space-x-4">
        {!timerActive ? (
          <button
            type="button"
            disabled={!sessionLength}
            onClick={startTimer}
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
              !sessionLength ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Start
          </button>
        ) : (
          <button
            type="button"
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
