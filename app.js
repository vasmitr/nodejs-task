import 'dotenv/config';
import DB from './src/db/db';

import getFees from './src/helpers/fee';
import processFile from './src/helpers/files';
import { mapTransactionFromData, mapUserFromData } from './src/helpers/mappings';
import processTransaction from './src/helpers/transactions';

async function app() {
  const feeData = await getFees();

  console.log(feeData);

  const fileName = process.argv[2];
  if (!fileName || fileName.length === 0) throw new Error('Please provide path to your JSON file');

  const fileData = processFile(fileName);
  const users = fileData.map(mapUserFromData);
  const transactions = fileData.map(mapTransactionFromData);

  const db = new DB(users, transactions);

  transactions.forEach((trn) => processTransaction(db, trn, console.log));
}

app();
