import getCurrencyPrecicion from './currency';

export function roundMoney(amount, currency) {
  const decimals = getCurrencyPrecicion(currency);
  return Math.ceil(amount * (10 ** decimals)) / (10 ** decimals);
}

export function calculateCashInFee(rules, amount, currency) {
  const maxFeeAmount = rules.cashInFee.max.amount;
  const { percents } = rules.cashInFee;

  const fee = amount * (percents / 100);
  const res = fee <= maxFeeAmount ? fee : maxFeeAmount;
  return roundMoney(res, currency);
}

export function calculateCashOutNaturalFee(rules, amount, userTotalAmount, currency) {
  const weekLimit = rules.cashOutNaturalFee.week_limit.amount;
  const { percents } = rules.cashOutNaturalFee;

  const exceededAmount = amount <= 1000 ? amount : amount - 1000;
  const fee = (exceededAmount * (percents / 100));
  const res = (weekLimit < userTotalAmount || weekLimit < amount) ? fee : 0.00;
  return roundMoney(res, currency);
}

export function calculateCashOutJuridicalFee(rules, amount, currency) {
  const { percents } = rules.cashOutJuridicalFee;
  const minAmount = rules.cashOutJuridicalFee.min.amount;

  const fee = amount * (percents / 100);
  const res = minAmount > fee ? minAmount : fee;
  return roundMoney(res, currency);
}

export default class Calculator {
  constructor(rules, db) {
    this.rules = rules;
    this.db = db;
    this.calculateFee = this.calculateFee.bind(this);
  }

  calculateFee(transaction) {
    const {
      amount, type, userId, currency,
    } = transaction;
    const { userType, totalAmount } = this.db.getUser(userId);

    if (type === 'cash_in') {
      return calculateCashInFee(this.rules, amount, currency);
    }

    if (type === 'cash_out') {
      if (userType === 'natural') {
        return calculateCashOutNaturalFee(this.rules, amount, totalAmount, currency);
      }
      if (userType === 'juridical') {
        return calculateCashOutJuridicalFee(this.rules, amount, currency);
      }
    }

    return 0;
  }
}
