import React from "react";
import Table from "./Table";
import { requests as reqs } from "../assets/data";

const Outlet = () => {
  const requests = reqs.map(({ addr, duration, status, price }) => {
    return {
      addr,
      duration,
      status,
      price,
    };
  });

  return <Table entries={requests} />;
};

export default Outlet;
