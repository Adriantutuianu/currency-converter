import "./App.css";
import { useState, useEffect } from "react";
import DocumentMeta from "react-document-meta";

function App() {
  const [amountValue, setAmountValue] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const meta = {
    title: "Curency converter",
    // description: "I am a description, and I can create multiple tags",
    // canonical: "http://example.com/path/to/page",
    // meta: {
    //   charset: "utf-8",
    //   name: {
    //     keywords: "react,meta,document,html,tags",
    //   },
    // },
  };

  return (
    <div className="App">
      <DocumentMeta {...meta} />
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
          </>
        )}
      </main>
    </div>
  );
}

export default App;
