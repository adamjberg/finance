import { Account } from "../Account";
import { v4 as uuidv4 } from "uuid";
import { Service } from "./Service";

class AccountService extends Service<Account> {
  constructor() {
    super({ key: "accounts" })
  }
}

export const accountService = new AccountService();
