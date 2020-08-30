import { Interface } from "@ethersproject/abi";
import { Transaction, VaultAsset } from "../@types";
import erc20ApproveTx from "./erc20ApproveTx";

const vaultWithdrawAllTx = (vaultAsset: VaultAsset): Transaction => {
  const vaultAddress: string = vaultAsset.vaultContractAddress as string;
  const vaultInterface: Interface = new Interface(vaultAsset.vaultContractABI);

  const withdrawTransaction: Transaction = {
    data: vaultInterface.encodeFunctionData("withdrawAll"),
    to: vaultAddress,
    value: 0,
  };

  return withdrawTransaction;
};

const vaultWithdrawAllTxs = (vaultAsset: VaultAsset): Transaction[] => {
  const approvalTransaction = erc20ApproveTx(vaultAsset, vaultAsset.vaultBalance);
  const withdrawTransaction = vaultWithdrawAllTx(vaultAsset);

  return [approvalTransaction, withdrawTransaction];
};

export default vaultWithdrawAllTxs;
