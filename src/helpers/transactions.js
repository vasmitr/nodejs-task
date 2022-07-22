import { isSameWeek, parseISO } from 'date-fns';

export default function processTransaction(db, transaction, operation) {
  const user = db.getUser(transaction.userId);
  const shouldCountWeekAmount = user.userType === 'natural' && transaction.type === 'cash_out';
  const hasAnotherWeekStarted = !!user.lastTransactionDate && !isSameWeek(
    parseISO(user.lastTransactionDate),
    parseISO(transaction.date),
    {
      weekStartsOn: 1, // Week starts on Monday
    },
  );

  if (shouldCountWeekAmount) {
    if (hasAnotherWeekStarted) {
      db.dropUserAmount(user.userId);
    }

    db.setUserTransactionLastDate(transaction.userId, transaction.date);
    db.addUserAmount(transaction.userId, transaction.amount);
  }

  return operation(transaction);
}
