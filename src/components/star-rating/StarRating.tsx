import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({ count = 5 }) => {
  const starsArr = [...Array(count).fill(0)];
  const [starNo, setStarNo] = useState<number | null>(null);
  const [starNoForHover, setStarNoForHover] = useState<number | null>(null);

  const onClickStar = (idx: number) => {
    if (idx + 1 === starNo) {
      setStarNo(null);
    } else {
      setStarNo(idx + 1);
    }
  };

  const handleMouseEnter = (idx: number) => {
    setStarNoForHover(idx + 1);
  };

  const handleMouseLeave = () => {
    setStarNoForHover(null);
  };

  return (
    <div className="star-container">
      {/* show by default 5 stars */}
      {starsArr.map((_star, index) => {
        const activeClass =
          starNo != null && index + 1 <= starNo ? "active" : "";

        const hoverClass =
          starNoForHover != null && index + 1 <= starNoForHover ? "hover" : "";

        return (
          <span
            key={`star-${index}`}
            className={`star ${activeClass} ${hoverClass}`}
            onClick={() => onClickStar(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={0}
            aria-label={`Rate ${index + 1} stars`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onClickStar(index);
              }
            }}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
