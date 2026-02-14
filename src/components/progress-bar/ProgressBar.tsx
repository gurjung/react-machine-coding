import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ value = 0 }: { value: number }) => {
  const safeValue = Math.min(100, Math.max(0, value));
  return (
    <div className="container">
      <span style={{ color: `${safeValue >= 50 ? "white" : "#3a3630"}` }}>
        {safeValue}%
      </span>
      <div
        role="progressbar"
        style={{ transform: `translateX(${safeValue - 100}%)` }}
        className="progress"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};

export default ProgressBar;
