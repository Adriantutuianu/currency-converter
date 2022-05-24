import "./App.css";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue(result);
  };

  console.log(Number(value));

  return (
    <div className="App">
      <main className="content">
        <div className="ammount">
          <p>Ammount</p>
          <input
            type="text"
            placeholder=""
            value={value}
            onChange={handleChange}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
