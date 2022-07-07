const AMOUNT_RENEWAL_DAY = 'Monday';

export default function processTransaction(db, transaction, operation) {
  if (transaction.type === 'cash_out') {
    db.addUserAmount(transaction.userId, transaction.amount);
  }

  const user = db.getUser(transaction.userId);

  if (transaction.weekday === AMOUNT_RENEWAL_DAY && user.userType === 'natural' && transaction.type === 'cash_out') {
    const userTransactions = db.getUserTransactionsPerDay(transaction.userId, transaction.date);
    if (transaction.date === userTransactions[0].date) {
      db.dropUserAmount(user.userId);
    }
  }
  return operation(transaction);
}
