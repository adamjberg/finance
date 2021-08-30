import { AccountBalance } from "../AccountBalance";
import { Service } from "./Service";

export class AccountBalanceService extends Service<AccountBalance> {
  constructor() {
    super({
      key: "accountBalances"
    })
  }

  public getByAccount(accountId: string) {
    return this.entries.filter((accountBalance) => {
      return accountBalance.account === accountId;
    })
  }
}

export const accountBalanceService = new AccountBalanceService();