export function roundMoney(amount) {
  // TODO: use currency
  return Math.ceil(amount * 100) / 100;
}

export function calculateCashInFee(rules, amount) {
  const maxFeeAmount = rules.cashInFee.max.amount;
  const { percents } = rules.cashInFee;

  const fee = amount * (percents / 100);
  const res = fee <= maxFeeAmount ? fee : maxFeeAmount;
  return roundMoney(res);
}

export function calculateCashOutNaturalFee(rules, amount, userTotalAmount) {
  const weekLimit = rules.cashOutNaturalFee.week_limit.amount;
  const { percents } = rules.cashOutNaturalFee;

  const exceededAmount = amount <= 1000 ? amount : amount - 1000;
  const fee = (exceededAmount * (percents / 100));
  const res = (weekLimit < userTotalAmount || weekLimit < amount) ? fee : 0.00;
  return roundMoney(res);
}

export function calculateCashOutJuridicalFee(rules, amount) {
  const { percents } = rules.cashOutJuridicalFee;
  const minAmount = rules.cashOutJuridicalFee.min.amount;

  const fee = amount * (percents / 100);
  const res = minAmount > fee ? minAmount : fee;
  return roundMoney(res);
}

export default class Calculator {
  constructor(rules, db) {
    this.rules = rules;
    this.db = db;
    this.calculateFee = this.calculateFee.bind(this);
  }

  calculateFee(transaction) {
    const {
      amount, type, userId,
    } = transaction;
    const { userType, totalAmount } = this.db.getUser(userId);

    if (type === 'cash_in') {
      return calculateCashInFee(this.rules, amount);
    }

    if (type === 'cash_out') {
      if (userType === 'natural') {
        return calculateCashOutNaturalFee(this.rules, amount, totalAmount);
      }
      if (userType === 'juridical') {
        return calculateCashOutJuridicalFee(this.rules, amount);
      }
    }

    return 0;
  }
}
