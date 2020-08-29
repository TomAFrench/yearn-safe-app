import React, { ReactElement, useMemo, useState } from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import styled from "styled-components";
import { Button } from "@gnosis.pm/safe-react-components";
import Table from "./Table";

import { VaultAsset } from "../../@types";
import { cellWidth } from "./Table/TableHead";
import { VAULT_TABLE_ID, Column, generateColumns } from "./columns";
import { HumanReadableVault } from "./types";
import { useVaultAssets } from "../../contexts/VaultsContext";
import { BigNumberToRoundedHumanFormat } from "../../utils";
import VaultModal from "../VaultModal";

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  &:hover {
    background-color: #fff3e2;
  }
`;

const ActionButton = styled(Button).attrs({ size: "md", variant: "contained", style: { margin: "0px 5px" } })``;

const humanVault = (vaultAsset: VaultAsset): HumanReadableVault => {
  const { id, apy, decimals, symbol, balance, vaultBalance } = vaultAsset;
  const humanBalance: string = BigNumberToRoundedHumanFormat(balance, decimals);
  const humanVaultBalance: string = BigNumberToRoundedHumanFormat(vaultBalance, decimals);

  return {
    id,
    symbol,
    balance,
    apy: `${apy ? (apy * 100).toFixed(2) : "0.00"}%`,
    vaultBalance,
    humanBalance,
    humanVaultBalance,
  };
};

function VaultsTable(): ReactElement {
  /** State Variables **/
  const vaultAssets = useVaultAssets();
  const [selectedVaultAsset, setSelectedVaultAsset] = useState<VaultAsset | null>(null);
  const [modalAction, setModalAction] = useState<"deposit" | "withdraw">("deposit");
  /** Memoized Variables **/

  const columns = useMemo(() => generateColumns(), []);

  const autoColumns = useMemo(() => columns.filter((column: Column) => !column.custom), [columns]);

  const tableContents = vaultAssets.map(vaultAsset => ({
    ...humanVault(vaultAsset),
    actions: (
      <>
        <ActionButton
          color="primary"
          onClick={() => {
            setModalAction("deposit");
            setSelectedVaultAsset(vaultAsset);
          }}
        >
          Deposit
        </ActionButton>
        <ActionButton
          color="secondary"
          onClick={() => {
            setModalAction("withdraw");
            setSelectedVaultAsset(vaultAsset);
          }}
        >
          Withdraw
        </ActionButton>
      </>
    ),
  }));

  return (
    <>
      <VaultModal vaultAsset={selectedVaultAsset} setVaultAsset={setSelectedVaultAsset} action={modalAction} />
      <Table
        columns={columns}
        data={tableContents}
        defaultFixed
        defaultOrder="desc"
        defaultOrderBy={VAULT_TABLE_ID}
        defaultRowsPerPage={10}
        label="Vaults"
        size={tableContents.length}
        noBorder
        disableLoadingOnEmptyTable
      >
        {(sortedData: HumanReadableVault[]) =>
          sortedData.map((row: HumanReadableVault) => (
            <>
              <StyledTableRow key={row.id} tabIndex={-1}>
                {autoColumns.map((column: Column) => (
                  <TableCell align={column.align} component="td" key={column.id} style={cellWidth(column.width)}>
                    {(row as { [key: string]: any })[column.id]}
                  </TableCell>
                ))}
              </StyledTableRow>
            </>
          ))
        }
      </Table>
    </>
  );
}

export default VaultsTable;
