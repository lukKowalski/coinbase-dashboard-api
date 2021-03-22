const client = require("../client");
const {
  getSpotPricesForList,
  getSpotPriceFor,
  getAccounts,
  getExchangeRates,
} = require("../api");
const { getDate30DaysAgo } = require("../utils");

const index = {
  path: "/monthlyDifferenceDashboard",
  method: "get",
  handler: (req, res, next) => {
    getAccounts().then((accounts) => {
      Promise.all([
        getSpotPricesForList({
          currencies: accounts.map(({ balance }) => balance.currency),
          date: getDate30DaysAgo(),
        }),
        getExchangeRates(),
      ]).then(([spotPrices, exchangeRates]) => {
        console.log(spotPrices, exchangeRates);
        res.json({
          spotPrices,
          exchangeRates,
          accounts,
        });
      });
    });
  },
};

const getBTCSpotPrice = {
  path: "/getBTCSpotPrice",
  method: "get",
  handler: (req, res, next) => {
    getSpotPriceFor({ currency: "BTC", date: "2021-02-22" }).then((data) =>
      res.json(data)
    );
  },
};

module.exports = {
  allRoutes: [index, getBTCSpotPrice],
};
