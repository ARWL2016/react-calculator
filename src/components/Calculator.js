import React from 'react';
import "./Calculator.scss"

const calculator = (props) => {
    const { display, subDisplay, handleClick } = props;
    // console.log(props)
    return (
        
            <div id="main" className="calculator">
              <h2>WILLIS JS500i ELECTRONIC</h2>
              <div id="screen" className="screen">
                <p id="display" className="display-primary">
                  {display}
                </p>
                <p id="subDisplay" className="display-secondary">
                  {subDisplay}
                </p>
              </div>
              <hr></hr>
              <div id="keypad" className="keypad" onClick={(e) => handleClick(e.target)}>
                  <button id="mrBtn" className="keypad-btn">MR</button>
                  <button id="mPlusBtn" className="keypad-btn">M+</button>
                  <button id="mMinusBtn" className="keypad-btn">M-</button>
                  <button id="percentBtn" className="keypad-btn">%</button>
                  <button id="divideBtn" className="keypad-btn op-btn">/</button>
                  <a href="https://github.com/ARWL2016/js-calculator" target="_blank">
                      <button id="shortcuts" className="keypad-btn">Git</button>
                      </a>
                  <button id="sevenBtn" className="keypad-btn number-btn">7</button>
                  <button id="eightBtn" className="keypad-btn number-btn">8</button>
                  <button id="nineBtn" className="keypad-btn number-btn">9</button>
                  <button id="multiplyBtn" className="keypad-btn op-btn">*</button>
                  <button id="posnegBtn" className="keypad-btn">+/-</button>
                  <button id="fourBtn" className="keypad-btn number-btn">4</button>
                  <button id="fiveBtn" className="keypad-btn number-btn">5</button>
                  <button id="sixBtn" className="keypad-btn number-btn">6</button>
                  <button id="minusBtn" className="keypad-btn op-btn">-</button>
                  <button id="clearBtn" className="keypad-btn clear-btn">C</button>
                  <button id="oneBtn" className="keypad-btn number-btn">1</button>
                  <button id="twoBtn" className="keypad-btn number-btn">2</button>
                  <button id="threeBtn" className="keypad-btn number-btn">3</button>
                  <button id="plusBtn" className="keypad-btn op-btn plus-btn">+</button>
                  <button id="allClearBtn" className="keypad-btn clear-btn">AC</button>
                  <button id="zeroBtn" className="keypad-btn number-btn">0</button>
                  <button id="decimalBtn" className="keypad-btn">.</button>
                  <button id="equalsBtn" className="keypad-btn">=</button>
              </div>
            </div>
    )
}

export default calculator;
