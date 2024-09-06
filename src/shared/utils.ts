export const convertStrArrToOptions = (arr: string[]) => {
  return arr.map((e) => ({ id: e, name: e }));
};

export const validateNodeConnection = (source: any[], target: any[]) => {
  let isValid = true;
  for (const sourceObj of source) {
    let found = false;
    for (const targetObj of target) {
      if (
        sourceObj.variable_name === targetObj.variable_name &&
        sourceObj.data_type === targetObj.data_type
      ) {
        found = true;
        break;
      }
    }
    if (!found) {
      isValid = false;
      break;
    }
  }
  return isValid;
};
