import 'dotenv/config';
import _uniqBy from 'lodash/uniqBy';
import DB from './src/db/db';

import getFees from './src/helpers/api';
import Calculator from './src/helpers/fee';
import processFile from './src/helpers/files';
import { mapTransactionFromData, mapUserFromData } from './src/helpers/mappings';
import processTransaction from './src/helpers/transactions';

async function app() {
  const feeData = await getFees();

  const fileName = process.argv[2];
  if (!fileName || fileName.length === 0) throw new Error('Please provide path to your JSON file');

  const fileData = processFile(fileName);
  const users = _uniqBy(fileData.map(mapUserFromData), 'userId');
  const transactions = fileData.map(mapTransactionFromData);

  const db = new DB(users, transactions);

  const calculator = new Calculator(feeData, db);

  transactions
    .map((trn) => processTransaction(db, trn, calculator.calculateFee))
    // eslint-disable-next-line no-console
    .forEach((x) => console.log(x));
}

app();
