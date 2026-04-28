export const getErrorMessage = (error: any): string => {
  if (error.response) {
    return error.response.data || "Something went wrong";
  } else if (error.request) {
    return "Server not responding";
  } else {
    return error.message;
  }
};