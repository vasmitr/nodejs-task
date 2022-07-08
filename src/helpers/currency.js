import currencyTable from '../mocks/currencyTable.json';

export default function getCurrencyPrecicion(currency) {
  return currencyTable.currencyTable[currency].decimals;
}
