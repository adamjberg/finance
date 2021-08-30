import { Account } from "../Account";
import { Service } from "./Service";

class AccountService extends Service<Account> {
  constructor() {
    super({ key: "accounts" })
  }
}

export const accountService = new AccountService();
