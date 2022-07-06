class DB {
  constructor(users, transactions) {
    this.users = users;
    this.transactions = transactions;
  }

  addUserAmount(userId, amount) {
    const user = this.users.find((_user) => _user.userId === userId);
    user.totalAmount += amount;
    this.users = [...this.users.filter((_user) => _user.userId !== userId), { ...user }];
  }

  dropUserAmount(userId) {
    const user = this.users.find((_user) => _user.userId === userId);
    user.totalAmount = 0;
    this.users = [...this.users.filter((_user) => _user.userId !== userId), { ...user }];
  }

  getUser(userId) {
    return this.users.find((_user) => _user.userId === userId);
  }

  getUserTransactionsPerDay(userId, date) {
    return this.transactions.filter(
      (transaction) => transaction.userId === userId && transaction.date === date,
    );
  }
}

export default DB;
