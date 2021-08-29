import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { accountBalanceService } from "../services/AccountBalanceService";
import { accountService } from "../services/AccountService";
import qs from "query-string";
import moment from "moment";

export const NewAccountBalancePage: React.FC = (props) => {
  const location = useLocation();

  const query = qs.parse(location.search);

  const history = useHistory();
  const [account, setAccount] = useState(query.account as string);
  const [balance, setBalance] = useState(0);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const accounts = accountService.getAll();

  async function handleSubmit() {
    await accountBalanceService.create({
      balance,
      account,
      date
    });

    history.push(ROUTES.Account.buildViewById(account))
  }

  return <div className="container">
    <label>Balance</label>
    <input type="number" value={balance} onChange={(e) => {setBalance(Number(e.currentTarget.value))}}/>
    <select value={account} onChange={(e) => {setAccount(e.currentTarget.value)}}>
      {accounts.map((account) => {
        return (<option key={account.id} value={account.id}>{account.name}</option>)
      })}
    </select>
    <input type="date" value={date} onChange={(e) => { setDate(e.currentTarget.value) }} />
    <button onClick={handleSubmit}>Submit</button>
  </div>;
};
