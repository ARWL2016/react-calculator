import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/app.actions";
import Calculator from "./components/Calculator";
import { KEY_MAP } from "./core/keyMap";

class App extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  handleKeyDown = (e) => {
    const input = KEY_MAP[e.which];

    if (input) {
      this.handleInput(input);
    }
  };

  handleClick = (target) => {
    const { nodeName, innerText } = target;
    if (nodeName === "BUTTON") {
      this.handleInput(innerText);
    }
  };

  handleInput = (input) => {
    switch (input) {
      case ".":
        this.props.handleDecimalInput();
        this.props.updateDisplay();
        break;
      case "%":
        this.props.removeExtraOps();
        this.props.handlePercentInput();
        this.props.updateDisplay();
        break;
      case "+/-":
        this.props.handlePosNegInput();
        this.props.updateDisplay();
        break;
      case "=":
        if (this.props.input.length > 2) {
          this.props.removeExtraOps();
          this.props.getAnswer();
        }
        break;
      case "AC":
        this.props.allClear();
        break;
      case "C":
        this.props.clear();
        this.props.updateDisplay();
        break;
      case "M+":
        this.props.memoryPlus();
        break;
      case "M-":
        this.props.memoryMinus();
        break;
      case "MR":
        this.props.memoryRecall();
        this.props.updateDisplay();
        break;
      default:
        if (input.match(/[0-9]/) && this.props.input.length <= 45) {
          this.handleNumberInput(input);
        } else if (["+", "-", "/", "*"].includes(input)) {
          this.handleOperatorInput(input);
        }
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

  render = () => {
    return (
      <Calculator
        display={this.props.display}
        subDisplay={this.props.subDisplay}
        handleClick={this.handleClick}
      />
    );
  };
}

const mapStateToProps = (state) => {
  return {
    input: state.input,
    display: state.display,
    subDisplay: state.subDisplay,
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
    handlePercentInput: () => dispatch(actions.handlePercentInput()),
    getAnswer: () => dispatch(actions.getAnswer()),
    allClear: () => dispatch(actions.allClear()),
    clear: () => dispatch(actions.clear()),
    memoryPlus: () => dispatch(actions.memoryPlus()),
    memoryMinus: () => dispatch(actions.memoryMinus()),
    memoryRecall: () => dispatch(actions.memoryRecall()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
