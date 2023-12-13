import React from "react";
import { Helmet } from "react-helmet-async";

function LoggedInHome() {
  return (
    <div>
      <Helmet>
        <title>Dashboard | TODO</title>
      </Helmet>
    </div>
  );
}

export default LoggedInHome;
