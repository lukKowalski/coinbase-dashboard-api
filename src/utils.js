const dateformat = require("dateformat")

const getDate30DaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  
  return dateformat(date, "yyyy-mm-dd");
};

module.exports = {
  getDate30DaysAgo,
};
