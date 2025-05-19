import { useState } from "react";

const MAX_LIMIT = 10;
const MIN_LIMIT = 0;

const CounterApp = () => {
  const [count, setCount] = useState<number>(0);
  const handleButtonClick = (type: "inc" | "dec", qty?: number) => {
    const newQty = qty ?? 1;
    if (type === "inc") {
      if (count + newQty > MAX_LIMIT) {
        alert("Reached maximum limit");
        return;
      }
      setCount((prev) => prev + newQty);
    } else {
      if (count - newQty < MIN_LIMIT) {
        alert("Reached minimum limit");
        return;
      }
      setCount((prev) => prev - newQty);
    }
  };

  const initialValues = () => {
    setCount(MIN_LIMIT);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <span>Count: {count}</span>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <button
          type="button"
          onClick={() => handleButtonClick("inc")}
          disabled={count >= 10}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => handleButtonClick("dec")}
          disabled={count <= 0}
        >
          -
        </button>
        <button type="button" onClick={initialValues}>
          RESET
        </button>
      </div>
    </div>
  );
};

export default CounterApp;
