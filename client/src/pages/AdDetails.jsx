import React, { useEffect, useState } from "react";
import * as s from "./AdDetailsStyles";
import Copy from "../components/Copy";
import { useParams } from "react-router";
import { useGET } from "../hooks/useServer";
import Loader from "../components/Loader";
import useWrite from "../hooks/useContract";
import { useAccount } from "wagmi";
import RunModal from "../components/RunModal";

const AdDetails = () => {
  const { adId } = useParams();
  const { address } = useAccount();
  const [ad, setAd] = useState(null);
  const [shouldGetSequencers, setShouldGetSequencers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const { write, hash, isHashPending } = useWrite();

  const {
    isPending: isPendingSequencers,
    error: errorSequencers,
    data: dataSequencers,
    refetch: refetchSequencers,
  } = useGET(
    ["ad", adId],
    `http://localhost:3333/api/v1/ads/${adId}`,
    true,
    3000
  );

  const handleJoinLeave = () => {
    if (ad.sequencers.includes(address)) {
      write("deregisterSequencer", [adId]);
    } else {
      write("registerSequencer", [adId]);
    }
  };

  const handleRun = () => {
    toggleModal();
  };

  useEffect(() => {
    if (dataSequencers) {
      console.log("dataSequencers: ", dataSequencers);
      setAd(dataSequencers);
    }
  }, [dataSequencers]);

  return (
    <s.PageContainer>
      <s.TitleJoinBtnContainer>
        <s.Title>Ad details</s.Title>
        {/* TODO: Maybe add later, but currently, it is difficult to test, register deregister with it, because wallet is problematic */}
        {address && ad && ad.sequencers.includes(address) ? (
          <s.BtnsContainer>
            <s.RunBtn onClick={handleRun}>Run</s.RunBtn>
            <s.JoinBtn onClick={handleJoinLeave}>Leave</s.JoinBtn>
          </s.BtnsContainer>
        ) : (
          <s.BtnsContainer>
            <s.JoinBtn onClick={handleJoinLeave}>Join</s.JoinBtn>
          </s.BtnsContainer>
        )}
      </s.TitleJoinBtnContainer>
      <s.Container>
        <s.SubTitle>Ad Info</s.SubTitle>
        {(!ad && <Loader />) || (
          <s.InfoItems>
            <s.InfoItem>
              <s.Property>Status</s.Property>
              <s.Value>{(ad.active && "Active") || "Inactive"}</s.Value>
              <Copy />
            </s.InfoItem>
            <s.InfoItem>
              <s.Property>ID</s.Property>
              <s.Value>{ad.adId}</s.Value> <Copy />
            </s.InfoItem>
            <s.InfoItem>
              <s.Property>Web-Socket URL</s.Property>
              <s.Value>
                {ad.rollups[0]?.executors[0].websocketUrl
                  ? ad.rollups[0]?.executors[0].websocketUrl
                  : "not added"}
              </s.Value>{" "}
              <Copy />
            </s.InfoItem>
            <s.InfoItem>
              <s.Property>RPC-URL</s.Property>
              <s.Value>
                {" "}
                {ad.rollups[0]?.executors[0]
                  ? ad.rollups[0]?.executors[0].rpcUrl
                  : "not added"}
              </s.Value>{" "}
              <Copy />
            </s.InfoItem>
            <s.InfoItem>
              <s.Property>Block Explorer URL</s.Property>
              <s.Value>
                {" "}
                {ad.rollups[0]?.executors[0]
                  ? ad.rollups[0]?.executors[0].blockExplorerUrl
                  : "not added"}
              </s.Value>{" "}
              <Copy />
            </s.InfoItem>
            <s.InfoItem>
              <s.Property>Quota</s.Property>
              <s.Value>
                {
                  ad.sequencers.filter(
                    (sequencer) =>
                      sequencer !== "0x0000000000000000000000000000000000000000"
                  ).length
                }
                /{ad.sequencers.length}
              </s.Value>{" "}
              <Copy />
            </s.InfoItem>
          </s.InfoItems>
        )}
      </s.Container>
      {ad && (
        <s.Container>
          <s.SubTitle>Sequencers</s.SubTitle>
          <s.Table>
            <s.Headers>
              <s.Header>Address</s.Header>
            </s.Headers>
            <s.Rows>
              {ad.sequencers
                .filter(
                  (sequencer) =>
                    sequencer !== "0x0000000000000000000000000000000000000000"
                )
                .map((sequencer, index) => (
                  <s.Row key={sequencer + index}>
                    <s.Cell>
                      <s.CellTxt>{sequencer}</s.CellTxt>
                    </s.Cell>
                  </s.Row>
                ))}
            </s.Rows>
          </s.Table>
        </s.Container>
      )}
      {showModal && <RunModal toggle={toggleModal} ad={ad} />}
    </s.PageContainer>
  );
};

export default AdDetails;
