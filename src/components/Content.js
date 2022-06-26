import React from "react";
import "./content.css";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { localList } from "../localList";

const Content = () => {
  const [amountValue, setAmountValue] = useState(1);
  const [currencies, setCurrencies] = useState({});
  const [loading, setLoading] = useState(false);
  const [firstSelect, setFirstSelect] = useState(
    currencies && Object.keys(currencies)[0]
  );
  const [secondSelect, setSecondSelect] = useState(
    currencies && Object.keys(currencies)[0]
  );
  const [convertResult, setConvertResult] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // local list - backup for API
  console.log("local list: ", localList);

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

  const handleClickConvert = async () => {
    if (amountValue <= 0) {
      setErrorMessage("Amount value must be greater than 0.");
    } else {
      setErrorMessage("");
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("apikey", process.env.REACT_APP_API_KEY);

      const requestOptions = {
        method: "GET",
        redirect: "follow",
        headers: myHeaders,
      };

      try {
        await fetch(
          `https://api.apilayer.com/currency_data/convert?to=${secondSelect}&from=${firstSelect}&amount=${amountValue}`,
          requestOptions
        )
          .then((res) => res.json())
          .then((res) => setConvertResult(res.result))
          .catch((error) => console.log("error", error));
      } catch (error) {
        console.log("Failed to convert: " + error);
      }
      setLoading(false);
    }
  };

  return (
    <main className="content">
      <div className="form-container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="amount row">
              <p>Amount:</p>
              <input
                className="amount-input"
                type="number"
                value={amountValue}
                onChange={handleChangeAmount}
              />
            </div>
            <div className="from-currency row">
              <p>From:</p>
              <select
                className="select-currency"
                onChange={(e) => setFirstSelect(e.target.value)}
                defaultValue={firstSelect}
              >
                {currencyOptions}
              </select>
            </div>
            <div className="to-currency row">
              <p>To:</p>
              <select
                className="select-currency select-currency-to"
                onChange={(e) => setSecondSelect(e.target.value)}
              >
                {currencyOptions}
              </select>{" "}
            </div>{" "}
            <p className="error-message">{errorMessage}</p>
            <div className="convert-container">
              {" "}
              <button
                type="submit"
                className="convert-button"
                onClick={handleClickConvert}
              >
                Convert
              </button>
              {convertResult > 0 && (
                <p className="convert-result">{convertResult.toFixed(3)}</p>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Content;
