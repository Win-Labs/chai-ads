import React, { useState } from "react";
import styled from "styled-components";

import cuid from "cuid";

import Copy from "../components/UI/Copy";
import Arrow from "./pfa/components/UI/Arrow";
import Button from "./pfa/components/UI/Button";

const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
  border: none;
  outline: none;
`;

const HeaderText = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.44px;
  text-transform: uppercase;
  flex: 1;
  color: #5a9bb0;
`;

const Body = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: #f4fcff;
  flex-direction: column;
  overflow-y: scroll;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  width: 100%;
  &:nth-child(even) {
    background: #ffffff;
  }
`;

const HeaderRow = styled(Row)`
  position: sticky;
  top: 0;
  background: #d6ebf2;
  border-bottom: 1px solid var(--Gray-50, #e9edf5);
`;

const CellWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 3px;
  align-items: center;
  color: #2b8492;
  cursor: pointer;
`;
const CellText = styled.span`
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  color: #2b8492;
`;

const StatusText = styled(CellText)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  text-transform: capitalize;
  border-radius: 5px;
  font-size: 12px;
  line-height: 18px;
  width: 100%;
  max-width: 90px;
  letter-spacing: 0.36px;
  background: ${({ status }) =>
    (status === "canceled" && "#d7e3e7") ||
    (status === "pending" && "rgba(214, 162, 67, 0.12)") ||
    (status === "completed" && "var(--Green-0, #E1FCEF)") ||
    (status === "ongoing" && "#2ea3fa")};
  color: ${({ status }) =>
    (status === "canceled" && "#94b6c1") ||
    (status === "pending" && "#D6A243") ||
    (status === "completed" && "var(--Green-500, #14804A)") ||
    (status === "ongoing" && "#fff")};
`;

const shorten = (ethAddr) =>
  ethAddr.length > 14 && ethAddr.slice(0, 8) + "..." + ethAddr.slice(-6);

const formatPrice = (value) => `0.${String(value).padStart(5, "0")} ETH`;

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
};

const Table = ({ entries }) => {
  return (
    <Body>
      <HeaderRow>
        <HeaderText>Address</HeaderText>
        <HeaderText></HeaderText>
        <HeaderText>Duration</HeaderText>
        <HeaderText>Price</HeaderText>
        <HeaderText>Status</HeaderText>
      </HeaderRow>
      {entries.map((entry) => {
        return (
          <Row key={cuid()}>
            <CellWrapper>
              <CellText>
                <StyledLink>{shorten(entry.addr)}</StyledLink>
              </CellText>
              <Copy handler={() => handleCopy(entry.addr)} />
            </CellWrapper>
            <CellWrapper>
              {entry.price < 0 ? (
                <svg
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              ) : (
                <svg
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                  />
                </svg>
              )}
            </CellWrapper>
            <CellWrapper>
              <CellText>
                <StyledLink>{entry.duration}</StyledLink>
              </CellText>
            </CellWrapper>
            <CellWrapper>
              <CellText>
                <StyledLink>{formatPrice(entry.price)}</StyledLink>
              </CellText>
            </CellWrapper>
            <CellWrapper>
              <StatusText status={entry.status}>{entry.status}</StatusText>
            </CellWrapper>
          </Row>
        );
      })}
    </Body>
  );
};

export default Table;
