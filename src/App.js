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
        <div className="from-currency">
          <p>From</p>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="to-currency">
          <p>To</p>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </main>
    </div>
  );
}

export default App;
