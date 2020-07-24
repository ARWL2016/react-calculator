import * as types from "./actionTypes";
import { last } from './utils';

const initialState = {
  input: [],
  display: '0',
};

const input = (state, action) => {
    const newInput = state.input.slice();
    newInput.push(action.payload);

    return Object.assign({}, state, {
      input: newInput,
    });
}

const removeExtraZeroes = (state) => {
    if (state.input[0] === "0" && state.input[1] !== ".") {
        const newInput = state.input.slice();
        newInput.pop();
        return Object.assign({}, state, {
          input: newInput,
        });
      } else {
        return state;
      }
}

const removeExtraOps = (state) => {
    const pattern = /\+|\-|\*|\//;
        if (isNaN(last(state.input)) && pattern.test(last(state.input))) {
            
            const newInput = state.input.slice();
            newInput.pop();

            return Object.assign({}, state, { input: newInput });
        } else {
            return state;
        }

}

const updateDisplay = (state) => {
    const newDisplay = state.input.length === 0 ? '0' : state.input.join("");

    return Object.assign({}, state, {
        display: newDisplay
      });

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.Input:
      return input(state, action);

    case types.Remove_Extra_Zeroes:
      return removeExtraZeroes(state);

    case types.Remove_Extra_Ops: 
        return removeExtraOps(state);

    case types.Update_Display:
        return updateDisplay(state);

    default:
      return state;
  }
};

export default reducer;
