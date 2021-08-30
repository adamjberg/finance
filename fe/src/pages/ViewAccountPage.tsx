import React from "react";
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { accountBalanceService } from "../services/AccountBalanceService";
import { accountService } from "../services/AccountService";

type Params = {
  id: string;
};

export const ViewAccountPage: React.FC = (props) => {
  const params = useParams<Params>();

  const account = accountService.getById(params.id);
  const accountBalances = accountBalanceService.getByAccount(params.id);

  if (!account) {
    return null;
  }

  return (
    <div className="container">
      <Link to={ROUTES.Account.list}>Back to all accounts</Link>
      <h1>{account.name}</h1>
      <Link to={ROUTES.Account.Balance.newWithParams({ account: account.id })}>
        Create Balance
      </Link>

      <table>
        <thead>
          <th>Balance</th>
          <th>Date</th>
        </thead>
        <tbody>
          {accountBalances.map((accountBalance) => {
            return (
              <tr>
                <td>{accountBalance.balance.toFixed(2)}</td>
                <td>{accountBalance.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
