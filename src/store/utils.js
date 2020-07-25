export const last = (arr) => {
    if (Array.isArray(arr) && arr.length > 0) {
        return arr[arr.length - 1];
    }

}

export const updateInput = (state, newInput) => {
    return Object.assign({}, state, {
      input: newInput
    })
  }