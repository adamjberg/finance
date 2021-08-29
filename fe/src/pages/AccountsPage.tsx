import React from "react";
import { Link, useHistory } from "react-router-dom";

import { ROUTES } from "../routes/Routes";
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
      {accounts.map((account) => {
        return (
          <div key={account.id}>
            <Link to={ROUTES.Account.buildViewById(account.id)}>
              {account.name}
            </Link>
            <button onClick={handleDelete.bind(this, account.id)}>x</button>
          </div>
        );
      })}
    </div>
  );
};
