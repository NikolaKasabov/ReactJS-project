const errorHandling = (errorObj, errorMessageChangeFunc, shouldDeleteMessage = false, delay = 2000) => {
  
  // if express server DID NOT respond
  if (!errorObj.response) {
    errorMessageChangeFunc(errorObj.message, shouldDeleteMessage, delay);
  } else {
    // if express server DID respond
    errorMessageChangeFunc(errorObj.response.data.error);
  }
}

export default errorHandling;
