const getObjectWith3Lang = (obj) => {
  // eng,ru,uz
  let isCorrectObject = false;
  if ("eng" in obj && "ru" in obj && "uz" in obj) {
    isCorrectObject = true;
  }
  return isCorrectObject;
};

module.exports = {
  getObjectWith3Lang,
};
