export const loadingAppConfig = () => {
  if (!process.env.REACT_APP_API_BASE_URL_SERVICE) {
    throw Error("Missing Env");
  }
  const { REACT_APP_API_BASE_URL_SERVICE } = process.env;
  return { REACT_APP_API_BASE_URL_SERVICE };
};
