import * as types from './actionTypes';

export const pushToInput = (input) => {
    return {
        type: types.Input,
        payload: input
    }
}

export const removeExtraZeroes = () => {
    return {
        type: types.Remove_Extra_Zeroes

    }
}

export const removeExtraOps = () => {
    return {
        type: types.Remove_Extra_Ops

    }
}

export const updateDisplay = () => {
    return {
        type: types.Update_Display
    }
}

