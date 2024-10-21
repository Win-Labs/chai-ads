import React, { useEffect, useState } from "react";
import * as s from "./DashboardStyles";
import Outgoing from "../components/Outgoing";
import Modal from "../components/Modal";
import Incoming from "../components/Incoming";
import { useAccount } from "wagmi";

const Dashboard = () => {
  const { address } = useAccount();

  const [activeTab, setActiveTab] = useState("outgoing");
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleTab = (event) => {
    setActiveTab(event.target.innerText.toLowerCase());
  };

  return (
    <s.PageContainer>
      {/* The part that goes here is actually implemented, check commit ff06edce8633e25b551c1d173fc4838205d73932 */}
      <s.TabsWrapper>
        <s.Tab $active={activeTab === "outgoing" ? 1 : 0} onClick={toggleTab}>
          Outgoing
        </s.Tab>
        <s.Tab $active={activeTab === "incoming" ? 1 : 0} onClick={toggleTab}>
          Incoming
        </s.Tab>
        {/* <s.ConnectWalletBtn>Connect Wallet</s.ConnectWalletBtn> */}
      </s.TabsWrapper>
      {activeTab === "incoming" ? (
        <Incoming address={address} />
      ) : (
        <Outgoing address={address} />
      )}
      {showModal && <Modal toggle={toggleModal} />}
    </s.PageContainer>
  );
};

export default Dashboard;

// Statuses of the outgoing requests:
// 1. Pending
// Options: Cancel
// 2. Completed
// 3. Incomplete (hours since request > 24)
// 4. Rejected
