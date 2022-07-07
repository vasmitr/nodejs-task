import { test, expect } from '@jest/globals';
import {
  calculateCashInFee, calculateCashOutJuridicalFee, calculateCashOutNaturalFee, roundMoney,
} from './fee';
import feeRulesJson from '../mocks/feeRules.json';

test('Fee rounds properly', () => {
  expect(roundMoney(0.023, 'EUR')).toBe(0.03);
  expect(roundMoney(0.021, 'EUR')).toBe(0.03);
  expect(roundMoney(0.020, 'EUR')).toBe(0.02);
  expect(roundMoney(0.0201, 'EUR')).toBe(0.03);
  expect(roundMoney(0.02000008, 'EUR')).toBe(0.03);
});

test('Cash in fee calculated properly', () => {
  expect(calculateCashInFee(feeRulesJson, 200, 'EUR')).toBe(0.06);
  expect(calculateCashInFee(feeRulesJson, 1000000, 'EUR')).toBe(5.00);
});

test('Cash out natural calculated properly', () => {
  expect(calculateCashOutNaturalFee(feeRulesJson, 100, 1100, 'EUR')).toBe(0.30);
  expect(calculateCashOutNaturalFee(feeRulesJson, 300, 100, 'EUR')).toBe(0.00);
  expect(calculateCashOutNaturalFee(feeRulesJson, 100, 0, 'EUR')).toBe(0.00);
});

test('Cash out juridical calculated properly', () => {
  expect(calculateCashOutJuridicalFee(feeRulesJson, 300, 'EUR')).toBe(0.90);
  expect(calculateCashOutJuridicalFee(feeRulesJson, 1, 'EUR')).toBe(0.50);
});
