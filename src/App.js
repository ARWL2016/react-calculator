import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/app.actions";
import Calculator from "./components/Calculator";
import { act } from "react-dom/test-utils";

class App extends Component {
  handleClick = (target) => {
    console.log(target.innerText);
    const { nodeName, innerText: input } = target;

    if (nodeName !== "BUTTON") {
      return;
    }

    if (input.match(/[0-9]/) && this.props.input.length <= 45) {
      this.handleNumberInput(input);
    } else if (
      input.match(/([+\-\/\*])/) &&
      input !== "+/-" &&
      input !== "M+" &&
      input !== "M-"
    ) {
      this.handleOperatorInput(input);
    } else if (input === ".") {
      this.props.handleDecimalInput();
      this.props.updateDisplay();
    } else if (input === "%") {
      this.handlePercentInput();
    } else if (input === "+/-") {
      this.props.handlePosNegInput();
      this.props.updateDisplay();
    } else if (input === "=") {
      if (this.props.input.length > 2) {
        this.props.removeExtraOps();
        this.props.getAnswer();
      }
    } else if (input === "AC") {
      this.props.allClear();
    } else if (input === "C") {
      this.props.clear();

      this.props.updateDisplay();

      // if (memoryTotal === 0) {
      //   subDisplay.innerText = "Ans";
      // } else {
      //   subDisplay.innerText = `memory: ${memoryTotal}`;
      // }
    } else if (input === 'M+') {
      this.props.memoryPlus();
    } else if (input === 'M-') {
      this.props.memoryMinus();
    }
  };

  handleNumberInput = (num) => {
    this.props.pushToInput(num);

    if (num === "0") {
      this.props.removeExtraZeroes();
    }
    this.props.updateDisplay();
  };

  handleOperatorInput = (operator) => {
    this.props.removeExtraOps();
    this.props.pushToInput(operator);
    this.props.removeInitialOps();
    this.props.updateDisplay();
  };

  handlePercentInput = () => {
    // this.removeExtraOps();
    // TODO
  };

  render = () => {
    // console.log(this.props)
    console.log(this.props.input);
    return (
      <Calculator display={this.props.display} subDisplay={this.props.subDisplay} handleClick={this.handleClick} />
    );
  };
}

const mapStateToProps = (state) => {
  return {
    input: state.input,
    display: state.display,
    subDisplay: state.subDisplay
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushToInput: (input) => dispatch(actions.pushToInput(input)),
    removeExtraZeroes: () => dispatch(actions.removeExtraZeroes()),
    updateDisplay: () => dispatch(actions.updateDisplay()),
    removeExtraOps: () => dispatch(actions.removeExtraOps()),
    removeInitialOps: () => dispatch(actions.removeInitialOps()),
    handleDecimalInput: () => dispatch(actions.handleDecimalInput()),
    handlePosNegInput: () => dispatch(actions.handlePosNegInput()),
    getAnswer: () => dispatch(actions.getAnswer()),
    allClear: () => dispatch(actions.allClear()),
    clear: () => dispatch(actions.clear()),
    memoryPlus: () => dispatch(actions.memoryPlus()),
    memoryMinus: () => dispatch(actions.memoryMinus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
