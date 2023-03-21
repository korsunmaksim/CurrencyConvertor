import React, { useState, useEffect } from "react";
import { Currency } from "./modules/currency.component";
import "./styles/convertor.styles.css";

function App() {
  const [currencies, setCurrencies] = useState({
    currency1: "USD",
    currency2: "USD",
  });
  const [currencyValue, setCurrencyValue] = useState({ value1: 1, value2: 1 });
  const [currencyData, setCurrencyData] = useState({
    UAH: 0,
    GBP: 0,
    JPY: 0,
    CHF: 0,
    EUR: 0,
    CNY: 0,
  });
  const currencyList = [
    { value: "USD", title: "USD" },
    { value: "UAH", title: "UAH" },
    { value: "GBP", title: "GBP" },
    { value: "JPY", title: "JPY" },
    { value: "CHF", title: "CHF" },
    { value: "EUR", title: "EUR" },
    { value: "CNY", title: "CNY" },
  ];

  const myHeaders = new Headers();
  myHeaders.append("apikey", "rz8A8dGhW3DCFKaj9XNgM34H90msQTn1");

  const options: RequestInit = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const getCurrencyData = async () => {
    const response = fetch(
      "https://api.apilayer.com/exchangerates_data/latest?symbols=UAH,GBP,JPY,CHF,EUR,CNY&base=USD",
      options
    )
      .then((response) => response.json())
      .then((data) => data.rates);
    setCurrencyData(await response);
  };

  function GetCurrentCurrency(thisCurrency: String) {
    switch (thisCurrency) {
      case "USD":
        return 1;
      case "UAH":
        return currencyData.UAH;
      case "GBP":
        return currencyData.GBP;
      case "JPY":
        return currencyData.JPY;
      case "CHF":
        return currencyData.CHF;
      case "EUR":
        return currencyData.EUR;
      case "CNY":
        return currencyData.CNY;
      default:
        return 1;
    }
  }

  useEffect(() => {
    getCurrencyData();
  }, []);

  useEffect(() => {
    setCurrencyValue({
      ...currencyValue,
      value2:
        currencyValue.value1 *
        (GetCurrentCurrency(currencies.currency2) /
          GetCurrentCurrency(currencies.currency1)),
    });
  }, [currencies.currency2]);

  useEffect(() => {
    setCurrencyValue({
      ...currencyValue,
      value1:
        currencyValue.value2 *
        (GetCurrentCurrency(currencies.currency1) /
          GetCurrentCurrency(currencies.currency2)),
    });
  }, [currencies.currency1]);

  return (
    <div className="convertor">
      <h1>Convertor</h1>
      <Currency
        value={currencyValue.value1}
        options={currencyList}
        inputHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCurrencyValue({
            value1: Number(e.target.value),
            value2:
              Number(e.target.value) *
              (GetCurrentCurrency(currencies.currency2) /
                GetCurrentCurrency(currencies.currency1)),
          });
        }}
        selectHandler={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setCurrencies({ ...currencies, currency1: e.target.value });
        }}
      />
      <Currency
        value={currencyValue.value2}
        options={currencyList}
        inputHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCurrencyValue({
            value1:
              Number(e.target.value) *
              (GetCurrentCurrency(currencies.currency1) /
                GetCurrentCurrency(currencies.currency2)),
            value2: Number(e.target.value),
          });
        }}
        selectHandler={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setCurrencies({ ...currencies, currency2: e.target.value });
        }}
      />
    </div>
  );
}

export default App;
