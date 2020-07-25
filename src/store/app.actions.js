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

export const removeInitialOps = () => {
    return {
        type: types.Remove_Initial_Ops
    }
}

export const handleDecimalInput = () => {
    return {
        type: types.Handle_Decimal_Input
    }
}

export const handlePosNegInput = () => {
    return {
        type: types.Handle_Pos_Neg_Input
    }
}

export const handlePercentInput = () => {
    return {
        type: types.Handle_Percent_Input
    }
}

export const updateDisplay = () => {
    return {
        type: types.Update_Display
    }
}

export const getAnswer = () => {
    return {
        type: types.Get_Answer
    }
}

export const allClear = () => {
    return {
        type: types.All_Clear
    }
}

export const clear = () => {
    return {
        type: types.Clear
    }
}

export const memoryPlus = () => {
    return {
        type: types.Memory_Plus
    }
}

export const memoryMinus = () => {
    return {
        type: types.Memory_Minus
    }
}

export const memoryRecall = () => {
    return {
        type: types.Memory_Recall
    }
}

