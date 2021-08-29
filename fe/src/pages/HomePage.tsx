import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

export const HomePage: React.FC = (props) => {
  return (
    <div className="container">
      <Link to={ROUTES.Account.list}>Accounts</Link>
    </div>
  );
};
