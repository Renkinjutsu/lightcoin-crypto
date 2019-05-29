  class Transaction {
    constructor(amount, account) {
      this.amount = amount;
      this.account = account;
    }
    commit() {
      if (this.isAllowed()) {
        this.time = new Date()
        this.account.addTransaction(this)
      }
    }
    isAllowed() {
      if (this.amount + this.value > 0) {
        return true;
      } else {
        return false
      }
    }
}

class Withdrawal extends Transaction {

  get value() {
    return - this.amount;
  }

}


class Deposit extends Transaction {

  get value() {
    return this.amount;
  }
}

class Account {
  constructor(username) {
    this.username = username;
    this._balance = 0;
    this.transactions = [];
  }

  get balance() {
    console.log("transactions", this.transactions)
    for(let value of this.transactions) {
      this._balance += value
      console.log(this._balance)
    }
    return this._balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction.value)
  }
 
}



// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("loocas")
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1.isAllowed());

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2.value);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3.value);

console.log('Balance:', myAccount.balance);
