import React from "react";
import { useState } from "react";
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
  const [currency, setCurrency] = useState(account?.currency);
  const [name, setName] = useState(account?.name);
  const accountBalances = accountBalanceService.getByAccount(params.id);

  if (!account) {
    return null;
  }

  return (
    <div className="container">
      <Link to={ROUTES.Account.list}>Back to all accounts</Link>
      <div>
        <input
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        ></input>
      </div>
      <div>
        <input
          placeholder="CAD"
          value={currency}
          onChange={(e) => {
            setCurrency(e.currentTarget.value);
          }}
        ></input>
      </div>

      <button
        onClick={() => {
          accountService.updateById(account.id, { name, currency });
        }}
      >
        Save
      </button>

      <div>
        <Link
          to={ROUTES.Account.Balance.newWithParams({ account: account.id })}
        >
          Create Balance
        </Link>
      </div>

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
                <td
                  onClick={() => {
                    accountBalanceService.deleteById(accountBalance.id);
                  }}
                >
                  <button>x</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
