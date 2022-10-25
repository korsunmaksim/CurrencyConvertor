import React from "react";
import "../styles/input.styles.css";
import "../styles/drop-list.styles.css";

interface CurrencyProps {
  value: number;
  inputHandler: any;
  selectHandler: any;
}

export const Currency = (props: CurrencyProps) => {
  return (
    <div>
      <select className="drop-list" onChange={props.selectHandler}>
        <option value="USD">USD</option>
        <option value="UAH">UAH</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        <option value="CHF">GHF</option>
        <option value="EUR">EUR</option>
        <option value="CNY">CNY</option>
      </select>
      <input
        placeholder="Enter number"
        type="number"
        value={props.value}
        onChange={props.inputHandler}
        className="input-currency"
      />
    </div>
  );
};
