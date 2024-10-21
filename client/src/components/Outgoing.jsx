import React, { useEffect, useState } from "react";
import { tableStyles as tS } from "../pages/ExplorerStyles";
import Loader from "./Loader";
import { useGET } from "../hooks/useServer";

const Outgoing = ({ address }) => {
  const [outgoingAds, setOutgoingAds] = useState(null);
  const [shouldGetOutgoingAds, setShouldGetOutgoingAds] = useState(false);

  const {
    isPending: isPendingOutgoingAds,
    error: errorOutgoingAds,
    data: dataOutgoingAds,
    refetch: refetchOutgoingAds,
  } = useGET(
    ["outgoingAds", address],
    `http://localhost:3333/api/v1/addresses/${address}/ads/joined`,
    true,
    300
  );

  useEffect(() => {
    if (dataOutgoingAds) {
      console.log("dataOutgoingAds: ", dataOutgoingAds);
      setOutgoingAds(dataOutgoingAds);
    }
  }, [dataOutgoingAds]);
  return (
    <tS.Table>
      <tS.Headers>
        <tS.Header>Status</tS.Header>
        <tS.Header>Id</tS.Header>
        <tS.Header>RPC Endpoint</tS.Header>
      </tS.Headers>
      <tS.Rows>
        {!outgoingAds ? (
          // <Loader />
          <></>
        ) : (
          outgoingAds.map((ad) => (
            <tS.Row key={ad.adId}>
              <tS.Cell>
                <tS.CellTxt>{(ad.active && "Active") || "Inactive"}</tS.CellTxt>
              </tS.Cell>
              <tS.Cell>
                <tS.CellTxt>{ad.adId}</tS.CellTxt>
              </tS.Cell>
              <tS.Cell>
                <tS.CellTxt>{ad.rpcUrl ? ad.rpcUrl : "Not added"}</tS.CellTxt>
              </tS.Cell>
            </tS.Row>
          ))
        )}
      </tS.Rows>
    </tS.Table>
  );
};

export default Outgoing;
