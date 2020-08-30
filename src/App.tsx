import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { Title } from "@gnosis.pm/safe-react-components";

import VaultsTable from "./components/VaultsTable";
import theme from "./theme";

const VaultsOuterWrapper = styled.div`
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

const YearnApp: React.FC = () => (
  <ThemeProvider theme={theme}>
    <VaultsOuterWrapper>
      <TopLeftHorizontalWrapper>
        <img src="logo.svg" alt="YFI Logo" height="30px" />
        <StyledTitle size="xs">Yearn Finance Vaults</StyledTitle>
      </TopLeftHorizontalWrapper>
      <TableWrapper>
        <VaultsTable />
      </TableWrapper>
    </VaultsOuterWrapper>
  </ThemeProvider>
);

export default YearnApp;
