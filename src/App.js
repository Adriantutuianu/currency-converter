import "./App.css";
import { useState } from "react";

function App() {
  const [ammountValue, setAmmountValue] = useState("");

  const handleChangeAmmount = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setAmmountValue(result);
  };

  console.log(Number(ammountValue));

  return (
    <div className="App">
      <main className="content">
        <div className="ammount">
          <p>Ammount</p>
          <input
            type="text"
            placeholder=""
            value={ammountValue}
            onChange={handleChangeAmmount}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
