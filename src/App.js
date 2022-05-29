import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [amountValue, setAmountValue] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstSelect, setFirstSelect] = useState(
    currencies && Object.keys(currencies)[0]
  );
  const [secondSelect, setSecondSelect] = useState("");

  const getCurrencies = async () => {
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("apikey", process.env.REACT_APP_API_KEY);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    try {
      await fetch("https://api.apilayer.com/currency_data/list", requestOptions)
        .then((res) => res.json())
        .then((res) => {
          setCurrencies(res.currencies);
        });
    } catch (error) {
      console.log("Failed to get all currencies: " + error);
    }
    setLoading(false);
  };
  const handleChangeAmount = (event) => {
    setAmountValue(Number(event.target.value));
  };
  useEffect(() => {
    getCurrencies();
  }, []);

  const currencyOptions = Object.entries(currencies).map(([key, value]) => {
    return (
      <option value={key} key={key}>
        {value}
      </option>
    );
  });
  console.log("first input: ", firstSelect);
  console.log("second input: ", secondSelect);
  return (
    <div className="App">
      <main className="content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="amount">
              <p>Amount</p>
              <input
                type="number"
                placeholder="0"
                value={amountValue}
                onChange={handleChangeAmount}
              />
            </div>
            <div className="from-currency">
              <p>From</p>
              <select
                onChange={(e) => setFirstSelect(e.target.value)}
                defaultValue={firstSelect}
              >
                {currencyOptions}
              </select>
            </div>
            <div className="to-currency">
              <p>To</p>
              <select onChange={(e) => setSecondSelect(e.target.value)}>
                {currencyOptions}
              </select>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
