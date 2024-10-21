import React, { useContext, useEffect, useState } from "react";
import * as s from "./ExplorerStyles";
import Loader from "../components/Loader";

import { useGET } from "../hooks/useServer";

import Modal from "../components/Modal";

const Explorer = () => {
  const [ads, setAds] = useState([]);
  const [shouldGetAds, setShouldGetAds] = useState(false);
  const [all, setAll] = useState(false);
  const [encrypted, setEncrypted] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const {
    isPending: isPendingAds,
    error: errorAds,
    data: dataAds,
    refetch: refetchAds,
    isFetching: isFetchingAds,
  } = useGET(["ads"], "http://localhost:3333/api/v1/ads", false, 3000);

  useEffect(() => {
    if (dataAds) {
      console.log("dataAds: ", dataAds);
      setAds(dataAds);
    }
  }, [dataAds]);

  const toggleAll = () => {
    setAll((prevState) => !prevState);
  };
  const toggleEncrypted = () => {
    setEncrypted((prevState) => !prevState);
  };
  return (
    <s.PageContainer>
      <s.Title>All Ads</s.Title>
      <s.ActionsContainer>
        <s.SelectSearchWrapper>
          <s.TypeSelectBox>
            <option defaultValue="All">All</option>
            <option value="zkStack">zk Stack</option>
            <option value="polygonCdk">Polygon CDK</option>
            <option value="madara">Madara</option>
            <option value="arbitrumOrbit">Arbitrum Orbit</option>
          </s.TypeSelectBox>
          <s.SearchInput>
            <s.Input />
          </s.SearchInput>
        </s.SelectSearchWrapper>
        <s.Filter $active={all} onClick={toggleAll}>
          Active
        </s.Filter>
        <s.Filter $active={encrypted} onClick={toggleEncrypted}>
          Encrypted Mempool
        </s.Filter>
        <s.GenerateBtn onClick={toggleModal}>Generate Ad</s.GenerateBtn>
      </s.ActionsContainer>
      <s.Table>
        <s.Headers>
          <s.Header>Status</s.Header>
          <s.Header>ID</s.Header>
          <s.Header>Quota</s.Header>
        </s.Headers>

        <s.Rows>
          {isPendingAds ? (
            // <Loader />
            <></>
          ) : (
            ads.map((ad) => (
              <s.Row to={`/${ad.adId}/details`} key={ad.adId}>
                <s.Cell>
                  <s.CellTxt>{ad.active ? "Active" : "Inactive"}</s.CellTxt>
                </s.Cell>
                <s.Cell>
                  <s.CellTxt>{ad.adId}</s.CellTxt>
                </s.Cell>
                <s.Cell>
                  <s.CellTxt>
                    {
                      ad.sequencers.filter(
                        (sequencer) =>
                          sequencer !==
                          "0x0000000000000000000000000000000000000000"
                      ).length
                    }
                    /{ad.sequencers.length}
                  </s.CellTxt>
                </s.Cell>
              </s.Row>
            ))
          )}
        </s.Rows>
      </s.Table>
      {showModal && <Modal toggle={toggleModal} />}
    </s.PageContainer>
  );
};

export default Explorer;
