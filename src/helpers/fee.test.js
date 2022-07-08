import { test, expect, beforeAll } from '@jest/globals';
import Calculator, {
  calculateCashInFee, calculateCashOutJuridicalFee, calculateCashOutNaturalFee, roundMoney,
} from './fee';
import feeRulesJson from '../mocks/feeRules.json';
import transactionsJson from '../mocks/transactions.json';
import DB from '../db/db';
import { mapTransactionFromData, mapUserFromData } from './mappings';
import processTransaction from './transactions';

let users; let transactions; let db; let
  calculator;

beforeAll(() => {
  users = transactionsJson.map(mapUserFromData);
  transactions = transactionsJson.map(mapTransactionFromData);
  db = new DB(users, transactions);
  calculator = new Calculator(feeRulesJson, db);
});

test('Fee rounds properly', () => {
  expect(roundMoney(0.023, 'EUR')).toBe(0.03);
  expect(roundMoney(0.021, 'EUR')).toBe(0.03);
  expect(roundMoney(0.020, 'EUR')).toBe(0.02);
  expect(roundMoney(0.0201, 'EUR')).toBe(0.03);
  expect(roundMoney(0.02000008, 'EUR')).toBe(0.03);
  expect(roundMoney(0.0023, 'BHD')).toBe(0.003);
  expect(roundMoney(0.023, 'JPY')).toBe(1);
});

test('Cash in fee calculated properly', () => {
  expect(calculateCashInFee(feeRulesJson, 200, 'EUR')).toBe(0.06);
  expect(calculateCashInFee(feeRulesJson, 1000000, 'EUR')).toBe(5.00);
});

test('Cash out natural calculated properly', () => {
  expect(calculateCashOutNaturalFee(feeRulesJson, 100, 1100, 'EUR')).toBe(0.30);
  expect(calculateCashOutNaturalFee(feeRulesJson, 300, 100, 'EUR')).toBe(0.00);
  expect(calculateCashOutNaturalFee(feeRulesJson, 100, 0, 'EUR')).toBe(0.00);
  expect(calculateCashOutNaturalFee(feeRulesJson, 1000, 30000, 'EUR')).toBe(3.00);
});

test('Cash out juridical calculated properly', () => {
  expect(calculateCashOutJuridicalFee(feeRulesJson, 300, 'EUR')).toBe(0.90);
  expect(calculateCashOutJuridicalFee(feeRulesJson, 1, 'EUR')).toBe(0.50);
});

test('Set of transactions processd correctly', () => {
  const expected = [0.06, 0.90, 87.00, 3.00, 0.30, 0.30, 5.00, 0.00, 0.00];
  expect(transactions
    .map((trn) => processTransaction(db, trn, calculator.calculateFee))).toStrictEqual(expected);
});
