import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { accountService } from "../services/AccountService";

export const NewAccountPage: React.FC = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");

  async function handleSubmit() {
    const account = await accountService.create({
      name
    });

    history.push(ROUTES.Account.buildViewById(account.id))
  }

  return <div className="container">
    <input value={name} onChange={(e) => {setName(e.currentTarget.value)}}/>
    <button onClick={handleSubmit}>Submit</button>
  </div>;
};
