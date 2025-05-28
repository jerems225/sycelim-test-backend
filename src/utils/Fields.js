//Check If All Values are filled
const isAllFilled = (obj) => {
  return Object.values(obj).every(value => value !== null && value !== undefined && value !== '');
};

module.exports = {
    isAllFilled
}