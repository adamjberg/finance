import { Account } from "../Account";
import { v4 as uuidv4 } from "uuid";

class AccountService {
  private accounts: Account[] = [];

  constructor() {
    this.load();
  }

  public async createAccount(account: Partial<Account>) {
    const newAccount = {
      ...account,
      id: this.getId(),
    } as Account;

    this.accounts.push(newAccount);

    this.save();

    return newAccount;
  }

  public getAll() {
    return this.accounts;
  }

  public getById(id: string): Account | null {
    for (const account of this.accounts) {
      if (account.id === id) {
        return account;
      }
    }
    return null;
  }

  public deleteById(id: string) {
    const index = this.accounts.findIndex((account) => account.id === id);
    if (index >= 0) {
      this.accounts.splice(index, 1);
    }
    this.save();
  }

  private getId() {
    return uuidv4();
  }

  private save() {
    localStorage.setItem("accounts", JSON.stringify(this.accounts));
  }

  private load() {
    const accounts = localStorage.getItem("accounts");
    if (accounts) {
      this.accounts = JSON.parse(accounts);
    }
  }
}

export const accountService = new AccountService();
