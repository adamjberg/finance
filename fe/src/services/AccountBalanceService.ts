import { AccountBalance } from "../AccountBalance";
import { Service } from "./Service";

export class AccountBalanceService extends Service<AccountBalance> {
  constructor() {
    super({
      key: "accountBalances"
    })
  }
}

export const accountBalanceService = new AccountBalanceService();