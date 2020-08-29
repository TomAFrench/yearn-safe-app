import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { Title } from "@gnosis.pm/safe-react-components";

import StreamTable from "./components/VaultsTable";
import theme from "./theme";

const StreamsOuterWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 16px 24px;
  width: calc(100% - 48px);
`;

const TableWrapper = styled.div`
  flex-grow: 1;
`;

const TopLeftHorizontalWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const StyledTitle = styled(Title)`
  margin-left: 10px;
`;

function YearnApp() {
  /** State Variables **/

  /** Side Effects **/

  return (
    <ThemeProvider theme={theme}>
      <StreamsOuterWrapper>
        <TopLeftHorizontalWrapper>
          <img src="logo.png" alt="YFI Logo" height="30px" />
          <StyledTitle size="xs">Yearn Finance Vaults</StyledTitle>
        </TopLeftHorizontalWrapper>
        <TableWrapper>
          <StreamTable />
        </TableWrapper>
      </StreamsOuterWrapper>
    </ThemeProvider>
  );
}

export default YearnApp;
