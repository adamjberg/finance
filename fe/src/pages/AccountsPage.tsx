import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { ROUTES } from "../routes/Routes";
import { accountBalanceService } from "../services/AccountBalanceService";
import { accountService } from "../services/AccountService";

export const AccountsPage: React.FC = (props) => {
  const history = useHistory();
  const accounts = accountService.getAll();

  const [usdToCAD, setUsdToCAD] = useState(1.2222);

  function handleDelete(id: string) {
    accountService.deleteById(id);
    history.go(0);
  }

  function convertCurrency(params: {
    balance: number;
    from: string;
    to: string;
  }) {
    const cadToUSD = 1 / usdToCAD;

    if (params.to === "CAD") {
      return params.balance * usdToCAD;
    } else {
      return params.balance * cadToUSD;
    }
  }

  let cadTotal = 0;
  let usdTotal = 0;

  return (
    <div className="container">
      <div>
        <Link to={ROUTES.Account.new}>Create Account</Link>
      </div>
      <div>
        <Link to={ROUTES.Export}>Import/Export</Link>
      </div>
      <div>
        <label>USD to CAD</label>
        <input
          type="number"
          value={usdToCAD}
          onChange={(e) => {
            setUsdToCAD(Number(e.currentTarget.value));
          }}
        ></input>
      </div>

      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Currency</th>
            <th>CAD Balance</th>
            <th>USD Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => {
            const accountBalance = accountBalanceService.getLatestByAccount(
              account.id
            );

            let cadBalance = 0;
            let usdBalance = 0;

            if (accountBalance) {
              cadBalance =
                account.currency === "CAD"
                  ? accountBalance?.balance
                  : convertCurrency({
                      balance: accountBalance?.balance,
                      from: account.currency,
                      to: "CAD",
                    });

              cadTotal += cadBalance;

              usdBalance =
                account.currency === "USD"
                  ? accountBalance?.balance
                  : convertCurrency({
                      balance: accountBalance?.balance,
                      from: account.currency,
                      to: "USD",
                    });

              usdTotal += usdBalance;
            }

            return (
              <tr key={account.id}>
                <td>
                  <Link to={ROUTES.Account.buildViewById(account.id)}>
                    {account.name}
                  </Link>
                </td>
                <td>{account.currency}</td>
                <td>{cadBalance.toFixed(2)}</td>
                <td>{usdBalance.toFixed(2)}</td>
                <td>
                  <button onClick={handleDelete.bind(this, account.id)}>
                    x
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td>Total</td>
            <td></td>
            <td>{cadTotal.toFixed(2)}</td>
            <td>{usdTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
