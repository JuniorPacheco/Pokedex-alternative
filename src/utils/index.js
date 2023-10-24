const isObject = (value) => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const waitSeconds = async (sec) => {
  await new Promise((resolve) => {
    setTimeout(resolve, sec);
  });
};

export { isObject, waitSeconds };
