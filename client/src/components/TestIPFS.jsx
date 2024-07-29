import React, { useEffect } from "react";
import { create } from "@web3-storage/w3up-client";

const TestIPFS = () => {
  useEffect(() => {
    const setIpfs = async () => {
      const client = await create();

      const space = await client.createSpace("my-awesome-space");

      const myAccount = await client.login("gylmanbm@gmail.com");
      console.log("Hello from IPFS");

      // wait for payment plan to be selected
      while (true) {
        const res = await myAccount.plan.get();
        if (res.ok) break;
        console.log("Waiting for payment plan to be selected...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      await myAccount.provision(space.did());
      await space.save();
    };

    setIpfs();
  }, []);

  return <div>TestIPFS</div>;
};

export default TestIPFS;
