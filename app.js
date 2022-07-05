import 'dotenv/config';

import getFees from './src/helpers/fee';

async function app() {
  const feeData = await getFees();

  console.log(feeData);
}

app();
