const { defaultTargetCurrency } = require("./constants");
const client = require("./client");

const getSpotPriceFor = ({
  currency,
  targetCurrency = defaultTargetCurrency,
  date,
}) =>
  new Promise((resolve, reject) => {
    client.getSpotPrice(
      {
        currencyPair: `${currency}-${targetCurrency}`,
        ...(date && { date }),
      },
      (err, data) => {
        return resolve({
          data: {
            currency,
            ...data,
          },
          ...(err && { err }),
        });
      }
    );
  });

const getSpotPricesForList = ({
  currencies,
  targetCurrency = defaultTargetCurrency,
  date,
}) =>
  new Promise((resolve, reject) => {
    Promise.all(
      currencies.map((currency) =>
        getSpotPriceFor({ currency, targetCurrency, date })
      )
    ).then((values) => {
      resolve(
        values.reduce((acc, { data }) => {
          acc[data.currency] = data;
          return acc;
        }, {})
      );
    });
  });

const getExchangeRates = () =>
  new Promise((resolve, reject) => {
    client.getExchangeRates(
      {
        currency: defaultTargetCurrency,
      },
      (err, { data }) => {
        resolve(data.rates);
      }
    );
  });

const getAccounts = () =>
  new Promise((resolve, reject) => {
    client.getAccounts({ limit: 100 }, function (err, accounts) {
      const list = [];

      resolve(
        accounts
          .map(({ balance, name, native_balance }) => ({
            balance,
            native_balance,
            name,
          }))
      );
    });
  });

module.exports = {
  getSpotPriceFor,
  getSpotPricesForList,
  getExchangeRates,
  getAccounts,
};
