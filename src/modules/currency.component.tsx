import React from "react";
import "../styles/input.styles.css";
import "../styles/drop-list.styles.css";

interface ICurrencyOptions {
  value: string;
  title: string;
}

interface ICurrencyProps {
  value: number;
  options: ICurrencyOptions[];
  inputHandler: React.ChangeEventHandler<HTMLInputElement>;
  selectHandler: React.ChangeEventHandler<HTMLSelectElement>;
}

export const Currency = (props: ICurrencyProps) => {
  return (
    <div>
      <select className="drop-list" onChange={props.selectHandler}>
        {props.options.map((el) => (
          <option key={el.value} value={el.value}>
            {el.title}
          </option>
        ))}
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
