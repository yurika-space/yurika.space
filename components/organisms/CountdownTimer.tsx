'use client';

import React, { useState, useEffect, useCallback } from 'react';

type Datetime = string | Date;

const CountdownTimer = ({ targetDate }: { targetDate: Datetime }) => {
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const distance = target - now;

    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, expired: false };
  }, [targetDate]);

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timer);
  }, [calculateTimeRemaining]); // Re-run effect if targetDate changes

  if (timeRemaining.expired) {
    return <div>Countdown Expired!</div>;
  }

  return (
    <div className="flex countdown-timer text-2xl w-screen h-screen justify-self-center justify-center items-center text-center align-items-center gap-4 md:text-4xl">
      <span>{timeRemaining.days}d </span>
      <span>{timeRemaining.hours}h </span>
      <span>{timeRemaining.minutes}m </span>
      <span>{timeRemaining.seconds}s</span>
    </div>
  );
};

export default CountdownTimer;