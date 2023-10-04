const getObjectWith3Lang = (obj) => {
  // en,ru,uz
  let isCorrectObject = false;
  if ("eng" in obj && "ru" in obj && "uz" in obj) {
    isObject = true;
  }
  return isCorrectObject;
};

module.exports = {
  getObjectWith3Lang,
};
