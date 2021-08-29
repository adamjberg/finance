import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { accountService } from "../services/AccountService";

type Params = {
  id: string;
};

export const ViewAccountPage: React.FC = (props) => {
  const history = useHistory();

  const params = useParams<Params>();

  const account = accountService.getById(params.id);
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
    </div>
  );
};
