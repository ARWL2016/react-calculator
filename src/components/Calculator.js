import React from "react";
import "./Calculator.scss";

const calculator = (props) => {
  const { display, subDisplay, handleClick } = props;
  return (
    <div className="calculator">
      <h2>WILLIS JS500i ELECTRONIC</h2>
      <div className="screen">
        <p className="display-primary">{display}</p>
        <p id="subDisplay" className="display-secondary">
          {subDisplay}
        </p>
      </div>
      <hr></hr>
      <div className="keypad" onClick={(e) => handleClick(e.target)}>
        <button>MR</button>
        <button>M+</button>
        <button>M-</button>
        <button>%</button>
        <button className=" op-btn">/</button>
        <a
          href="https://github.com/ARWL2016/react-calculator"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Git</button>
        </a>
        <button className="number-btn">7</button>
        <button className="number-btn">8</button>
        <button className="number-btn">9</button>
        <button className="op-btn">*</button>
        <button>+/-</button>
        <button className="number-btn">4</button>
        <button className="number-btn">5</button>
        <button className="number-btn">6</button>
        <button className="op-btn">-</button>
        <button className="clear-btn">C</button>
        <button className="number-btn">1</button>
        <button className="number-btn">2</button>
        <button className="number-btn">3</button>
        <button className="op-btn plus-btn">+</button>
        <button className="clear-btn">AC</button>
        <button className="number-btn">0</button>
        <button>.</button>
        <button>=</button>
      </div>
    </div>
  );
};

export default calculator;
