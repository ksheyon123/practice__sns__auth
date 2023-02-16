const queryParser = (str) => {
  let returnObj = {};
  str
    .replace("?", "")
    .split("&")
    .map((el) => {
      const rawStr = el.split("=");
      const key = rawStr[0];
      const value = rawStr[1];
      returnObj = {
        ...returnObj,
        [key]: value,
      };
    });
  return returnObj;
};

const queryStringCreator = (params) => {
  try {
    if (!params) {
      return "";
    }
    let initialValue = "?";
    const keys = Object.keys(params);
    keys.map((el, idx) => {
      if (idx === keys.length - 1) {
        initialValue = initialValue + el + "=" + params[el];
        return;
      }
      initialValue = initialValue + el + "=" + params[el] + "&";
    });
    return initialValue;
  } catch (e) {
    throw e;
  }
};

export { queryParser, queryStringCreator };
