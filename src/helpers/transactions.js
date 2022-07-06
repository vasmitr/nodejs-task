const AMOUNT_RENEWAL_DAY = 'Monday';

export default function processTransaction(db, transaction, operation) {
  db.addUserAmount(transaction.userId, transaction.amount);
  const user = db.getUser(transaction.userId);

  if (transaction.workday === AMOUNT_RENEWAL_DAY) {
    const userTransactions = db.getUserTransactionsPerDay(transaction.date, AMOUNT_RENEWAL_DAY);
    if (transaction.date === userTransactions[0].date) {
      db.dropUserAmount(user.userId);
    }
  }
  return operation(transaction);
}
