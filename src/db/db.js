class DB {
  constructor(users, transactions) {
    this.users = users;
    this.transactions = transactions;
  }

  getUser(userId) {
    try {
      return this.users.find((_user) => _user.userId === userId);
    } catch (e) {
      throw new Error(`User not found, ${e.text}`);
    }
  }

  insertUser(user) {
    try {
      this.users = [...this.users.filter((_user) => _user.userId !== user.userId), { ...user }];
    } catch (e) {
      throw new Error(`Error while inserting user, ${e.text}`);
    }
  }

  setUserTransactionLastDate(userId, date) {
    const user = this.getUser(userId);
    user.lastTransactionDate = date;
    this.insertUser(user);
  }

  addUserAmount(userId, amount) {
    const user = this.getUser(userId);
    user.totalAmount += amount;
    this.insertUser(user);
  }

  dropUserAmount(userId) {
    const user = this.getUser(userId);
    user.totalAmount = 0;
    this.insertUser(user);
  }

  getUserTransactionsPerDay(userId, date) {
    return this.transactions.filter(
      (transaction) => transaction.userId === userId && transaction.date === date,
    );
  }
}

export default DB;
