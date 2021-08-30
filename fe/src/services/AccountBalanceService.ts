import { AccountBalance } from "../AccountBalance";
import { Service } from "./Service";

export class AccountBalanceService extends Service<AccountBalance> {
  constructor() {
    super({
      key: "accountBalances"
    })
  }

  public getLatestByAccount(accountId: string) {
    const sorted =  this.getByAccount(accountId).sort((a, b) => {
      return a.date < b.date ? 1 : -1;
    })

    if (sorted.length) {
      return sorted[0]
    } else {
      return null;
    }
  }

  public getByAccount(accountId: string) {
    return this.entries.filter((accountBalance) => {
      return accountBalance.account === accountId;
    })
  }
}

export const accountBalanceService = new AccountBalanceService();