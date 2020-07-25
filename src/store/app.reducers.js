import * as types from "./actionTypes";
import { last } from "./utils";

const initialState = {
  input: [],
  display: "0",
  subDisplay: "Ans",
  memoryTotal: 0,
};

const MAX_RESULT = 999999999999;

const input = (state, action) => {
  const newInput = state.input.slice();
  newInput.push(action.payload);

  return Object.assign({}, state, {
    input: newInput,
  });
};

const removeExtraZeroes = (state) => {
  if (state.input[0] === "0" && state.input[1] !== ".") {
    const newInput = state.input.slice(0, -1);
    return Object.assign({}, state, {
      input: newInput,
    });
  } else {
    return state;
  }
};

const removeExtraOps = (state) => {
  const pattern = /\+|-|\*|\//;
  if (isNaN(last(state.input)) && pattern.test(last(state.input))) {
    const newInput = state.input.slice(0, -1);

    return Object.assign({}, state, { input: newInput });
  } else {
    return state;
  }
};

const removeInitialOps = (state) => {
  // prevent initial ops except for + / -
  if (state.input[0] === "*" || state.input[0] === "/") {
    const newInput = state.input.slice();
    newInput.shift();

    return Object.assign({}, state, { input: newInput });
  } else {
    return state;
  }
};

const handleDecimalInput = (state) => {
  /**
   * Only allow a decimal point to be entered if there is an operator following a previous decimal
   * or if there is no operator or decimal
   */

  let lastIndexOfOp = -1;
  ["/", "*", "-", "+"].forEach((op) => {
    let k = state.input.lastIndexOf(op);
    if (k > lastIndexOfOp) {
      lastIndexOfOp = k;
    }
  });

  if (lastIndexOfOp >= state.input.lastIndexOf(".")) {
    const newInput = state.input.slice();
    if (state.input.length === 0) {
      newInput.push("0");
    }
    newInput.push(".");

    return Object.assign({}, state, { input: newInput });
  } else {
    return state;
  }
};

const handlePosNegInput = (state) => {
  const newInput = state.input.slice();

  if (state.input[0] === "+") {
    newInput.shift();
    newInput.unshift("-");
  } else if (state.input[0] === "-") {
    newInput.shift();
    newInput.unshift("+");
  } else {
    newInput.unshift("-");
  }

  return Object.assign({}, state, { input: newInput });
};

const handlePercentInput = (state) => {
  const newInput = state.input.slice();
  if (state.input.length !== 0) {
    newInput.push("/", 100);

    return Object.assign({}, state, { input: newInput })
  } else {
    return state;
  }
}

const updateDisplay = (state) => {
  const newDisplay = state.input.length === 0 ? "0" : state.input.join("");

  return Object.assign({}, state, {
    display: newDisplay,
  });
};

const getAnswer = (state) => {
  // eslint-disable-next-line no-eval
  let result = eval(state.input.join(""));
  result = +result.toFixed(9);
  if (result > MAX_RESULT) {
    result = result.toExponential(2);
  }

  return Object.assign({}, state, {
    display: result,
    input: [],
  });
};

const allClear = (state) => {
  return Object.assign({}, state, {
    input: [],
    display: "0",
    subDisplay: "Ans",
    memoryTotal: 0,
  });
};

const clear = (state) => {
  const newInput = state.input.slice(0, -1);
  return Object.assign({}, state, {
    input: newInput
  })
  
};

const memoryUpdate = (state, isAdd) => {
  if (!isNaN(state.display)) {
    const newMemoryTotal = isAdd ? 
      state.memoryTotal + +state.display :
      state.memoryTotal - +state.display;

    return Object.assign({}, state, {
      memoryTotal: newMemoryTotal,
      input: [],
      subDisplay: `memory: ${newMemoryTotal}`, 
      display: '0'
    })
  } else {
    return state;
  }
}

const memoryPlus = (state) => {
  return memoryUpdate(state, true);
}

const memoryMinus = (state) => {
  return memoryUpdate(state, false);
}

const memoryRecall = (state) => {
  const newInput = state.input.slice();
  const lastInput = last(state.input);

  if (isNaN(lastInput) && lastInput !== '.') {
    newInput.push(state.memoryTotal.toString());

    return Object.assign({}, state, { input: newInput });
  } else {
    return state;
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.Input:
      return input(state, action);

    case types.Remove_Extra_Zeroes:
      return removeExtraZeroes(state);

    case types.Remove_Extra_Ops:
      return removeExtraOps(state);

    case types.Remove_Initial_Ops:
      return removeInitialOps(state);

    case types.Handle_Decimal_Input:
      return handleDecimalInput(state);

    case types.Handle_Pos_Neg_Input:
      return handlePosNegInput(state);

    case types.Handle_Percent_Input: 
      return handlePercentInput(state);

    case types.Update_Display:
      return updateDisplay(state);

    case types.Get_Answer:
      return getAnswer(state);

    case types.All_Clear:
      return allClear(state);

    case types.Clear:
      return clear(state);

    case types.Memory_Plus: 
      return memoryPlus(state);

    case types.Memory_Minus: 
      return memoryMinus(state);

    case types.Memory_Recall: 
      return memoryRecall(state);

    default:
      return state;
  }
};

export default reducer;
