import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import { accountBalanceService } from "../services/AccountBalanceService";
import { accountService } from "../services/AccountService";

export const ExportPage: React.FC = (props) => {
  function handleExport() {
    const data = {
      accounts: accountService.getAll(),
      accountBalances: accountBalanceService.getAll(),
    };

    const url = window.URL.createObjectURL(
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `finance-db.json`);

    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  const handleImportFileChanged: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (e) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;

        const jsonData = JSON.parse(text);
        accountService.setEntries(jsonData.accounts);
        accountBalanceService.setEntries(jsonData.accountBalances);
      };

      if (e.target.files) {
        reader.readAsText(e.target.files[0]);
      }
    };

  return (
    <div className="container">
      <Link to={ROUTES.Account.list}>Back to accounts</Link>

      <h2>Export</h2>
      <button onClick={handleExport}>Export</button>
      <h2>Import</h2>
      <input type="file" onChange={handleImportFileChanged}></input>
    </div>
  );
};
