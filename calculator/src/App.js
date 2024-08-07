import "./App.css";
import { useState } from "react";

export default function App() {
  const [typedNumber, setTypedNumber] = useState("");

  function handleButtonClick(value) {
    setTypedNumber((prev) => prev + value);
  }

  function handleSubmit() {
    try {
      setTypedNumber(eval(typedNumber).toString());
    } catch (error) {
      setTypedNumber("Error");
    }
  }

  function handleClear() {
    setTypedNumber("");
  }

  return (
    <div className="calculator-body">
      <Anwser typedNumber={typedNumber} />
      <CalcBody
        onTypedNumber={handleButtonClick}
        onSubmit={handleSubmit}
        onClear={handleClear}
      />
    </div>
  );
}

function CalcBody({ onTypedNumber, onSubmit, onClear }) {
  const buttons = Array.from({ length: 9 }, (_, i) => i + 1); // Liczby od 1 do 9
  const operators = ["+", "-", "*", "/", "C", "="]; // Operator "=" dodany do listy

  return (
    <div className="calc-grid">
      <div className="numbers">
        {buttons.map((button) => (
          <Button key={button} onClick={() => onTypedNumber(button.toString())}>
            {button}
          </Button>
        ))}
      </div>
      <div className="operators">
        {operators.map((operator) => (
          <Button
            key={operator}
            onClick={() => {
              if (operator === "C") {
                onClear();
              } else if (operator === "=") {
                onSubmit();
              } else {
                onTypedNumber(operator);
              }
            }}
          >
            {operator}
          </Button>
        ))}
      </div>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <div>
      <button onClick={onClick}>{children}</button>
    </div>
  );
}

function Anwser({ typedNumber }) {
  return (
    <div>
      <label>Wynik</label>
      <input disabled value={typedNumber} />
    </div>
  );
}
