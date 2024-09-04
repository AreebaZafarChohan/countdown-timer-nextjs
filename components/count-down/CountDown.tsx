"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import ThemeToggle from "../themeToggle/ThemeToggle";
import Image from "next/image";

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to calculate total time in seconds
  const calculateTimeLeft = () => hours * 3600 + minutes * 60 + seconds;

  // Function to handle setting the duration of the countdown
  const handleSetDuration = (): void => {
    const totalSeconds = calculateTimeLeft();
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Function to start the countdown timer
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  // Function to pause the countdown timer
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Function to reset the countdown timer
  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(calculateTimeLeft());
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // useEffect hook to manage the countdown interval
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  // Function to format time left into hh:mm:ss format
  const formatTime = (time: number): string => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Function to determine the shadow based on time left
  const getShadowClass = (time: number): string => {
    const maxTime = calculateTimeLeft();
    if (time <= 0) return "shadow-red"; // When time is up
    const percentage = (time / maxTime) * 100;
    if (percentage > 50) return "shadow-green";
    if (percentage > 20) return "shadow-yellow";
    return "shadow-red";
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
       {/* Adding theme toggle*/}
       <div className="absolute top-4 right-4">
       < ThemeToggle />
       </div>
       <div className="absolute top-4 left-4">
      <Image 
      src="/images/logo.jpg"
      alt="Logo Image"
      width={40}
      height={40} 
      className= "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-500 rounded-full p-1"
      />
       </div>
      {/* Timer title */}
      <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200 text-center font-serif">
        Countdown Timer
      </h1>

      {/* Circle container for timer and set box */}
      <div
        className={`flex flex-col items-center justify-center md:w-80 md:h-80 lg:w-80 lg:h-80  w-60 h-60 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg ${getShadowClass(timeLeft)}`}
      >
        {/* Set Timer box and timer display */}
        <div className="flex flex-col items-center p-4">
          {/* Dropdown for hours, minutes, and seconds in a single box */}
            <div className="flex items-center mb-4">
              <select
                className="b rounded-2xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 text-sm mx-1 md:text-2xl lg:text-2xl"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <span className="text-gray-700 dark:text-gray-200 text-lg">:</span>
              <select
                className="b rounded-2xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 text-sm mx-1 my-1 md:text-2xl lg:text-2xl"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <span className="text-gray-700 dark:text-gray-200 text-lg">:</span>
              <select
                className="b rounded-2xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 text-sm mx-1 md:text-2xl lg:text-2xl"
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
              >
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i} value={i}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <Button onClick={handleSetDuration} variant="outline" className="b text-gray-800 dark:text-gray-200 mb-3 font-serif font-bold">
              Set Timer
            </Button>

          {/* Display the formatted time left */}
          <div className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>

      {/* Buttons to start, pause, and reset the timer */}
      <div className="flex justify-center gap-4 mt-8">
        <Button onClick={handleStart} variant="outline" className="b text-gray-800 dark:text-gray-200 font-serif font-bold">
          {isPaused ? "Resume" : "Start"}
        </Button>
        <Button onClick={handlePause} variant="outline" className="b text-gray-800 dark:text-gray-200 font-serif font-bold">
          Pause
        </Button>
        <Button onClick={handleReset} variant="outline" className="b text-gray-800 dark:text-gray-200 font-serif font-bold">
          Reset
        </Button>
      </div>
    </div>
  );
}