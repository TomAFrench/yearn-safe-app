import { Interface } from "@ethersproject/abi";
import { BigNumberish } from "@ethersproject/bignumber";
import { Transaction, VaultAsset } from "../@types";
import erc20ApproveTx from "./erc20ApproveTx";

const vaultDepositTx = (vaultAsset: VaultAsset, amount: BigNumberish): Transaction => {
  const vaultAddress: string = vaultAsset.vaultContractAddress as string;
  const vaultInterface: Interface = new Interface(vaultAsset.vaultContractABI);

  const depositTransaction: Transaction = {
    data: vaultInterface.encodeFunctionData("deposit", [amount]),
    to: vaultAddress,
    value: 0,
  };

  return depositTransaction;
};

const vaultDepositTxs = (vaultAsset: VaultAsset, amount: BigNumberish): Transaction[] => {
  const approvalTransaction = erc20ApproveTx(vaultAsset, amount);
  const depositTransaction = vaultDepositTx(vaultAsset, amount);

  return [approvalTransaction, depositTransaction];
};

export default vaultDepositTxs;
