import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./store/app.actions";
import Calculator from './components/Calculator';

class App extends Component {
  handleClick = (target) => {
    console.log(target.innerText);
    const { nodeName, innerText: input } = target;

    if (nodeName !== 'BUTTON') { return; }

    if (input.match(/[0-9]/) && this.props.input.length <= 45) {
      this.handleNumberInput(input)
    } else if (input.match(/([+\-\/\*])/) && input !== "+/-" && input !== "M+" && input !== "M-") {
      this.handleOperatorInput(input);
    }
  }

  handleNumberInput = (num) => {
    this.props.pushToInput(num);

    if (num === "0") {
      this.props.removeExtraZeroes();
    }
    this.props.updateDisplay()
  }

  handleOperatorInput = (operator) => {
    this.props.removeExtraOps();
    this.props.pushToInput(operator);

    this.props.updateDisplay();
  }

  render = () => {
    console.log(this.props)
    return (
      <Calculator display={this.props.display} handleClick={this.handleClick} />
    );
    
  }
}

const mapStateToProps = (state) => {
  return {
    input: state.input,
    display: state.display
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushToInput: (input) => dispatch(actions.pushToInput(input)),
    removeExtraZeroes: () => dispatch(actions.removeExtraZeroes()),
    updateDisplay: () => dispatch(actions.updateDisplay()),
    removeExtraOps: () => dispatch(actions.removeExtraOps())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
