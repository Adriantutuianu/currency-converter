import "./App.css";
import { useState } from "react";

function App() {
  const [amountValue, setAmountValue] = useState("");

  const handleChangeAmount = (event) => {
    setAmountValue(Number(event.target.value));
  };

  console.log(amountValue);

  return (
    <div className="App">
      <main className="content">
        <div className="amount">
          <p>Amount</p>
          <input
            type="number"
            placeholder=""
            value={amountValue}
            onChange={handleChangeAmount}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
