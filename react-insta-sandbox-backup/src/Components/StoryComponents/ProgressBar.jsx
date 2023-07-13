import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

export const ProgressBar = ({ index, activeIndex, duration }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        }
        clearInterval(interval);
        return prevProgress;
      });
    }, duration / 100);

    return () => {
      clearInterval(interval);
    };
  }, [duration, activeIndex]);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  const isActive = index === activeIndex;

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
      <div
        className={`progress-bar ${isActive ? "progress-bar" : ""}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
