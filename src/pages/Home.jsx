import React from "react";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <div>
      <Helmet>
        <title>Welcome to TODO App</title>
      </Helmet>
      <h3 className="text-center">Welcome to TODO App</h3>
    </div>
  );
}

export default Home;
