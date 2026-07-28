// rafc
import { useCounter } from "./hooks/useCounter";
/**
 * custom hook con ejemplo de contador
 *
 */
const COUNTER_DEFAULT_VALUE = 5;

export const MyCounterApp = () => {
  // custom hook: este custom hook devolvera logica para modularizar logica
  const { counter, handleAdd, handleSubstract, handleReset } = useCounter(COUNTER_DEFAULT_VALUE);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <h1 className="counter">counter: {counter}</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleAdd}>+1</button>
        <button onClick={handleSubstract}>-1</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
