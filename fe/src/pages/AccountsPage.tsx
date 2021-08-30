import React from "react";
import { Link, useHistory } from "react-router-dom";

import { ROUTES } from "../routes/Routes";
import { accountBalanceService } from "../services/AccountBalanceService";
import { accountService } from "../services/AccountService";

export const AccountsPage: React.FC = (props) => {
  const history = useHistory();
  const accounts = accountService.getAll();

  function handleDelete(id: string) {
    accountService.deleteById(id);
    history.go(0);
  }

  return (
    <div className="container">
      <Link to={ROUTES.Account.new}>Create Account</Link>
      <table>
        <thead>
          <th>Account</th>
          <th>Balance</th>
        </thead>
        <tbody>
      {accounts.map((account) => {
        const accountBalance = accountBalanceService.getLatestByAccount(account.id);
        return (
          <tr key={account.id}>
            <td>
            <Link to={ROUTES.Account.buildViewById(account.id)}>
              {account.name}
            </Link>
            </td>
            <td>
              {account.currency}
            </td>
            <td>
              {accountBalance?.balance}
            </td>
            <td>
            <button onClick={handleDelete.bind(this, account.id)}>x</button>
            </td>
          </tr>
        );
      })}
      </tbody>
      </table>
    </div>
  );
};
