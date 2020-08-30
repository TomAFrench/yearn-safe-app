import { Interface, JsonFragment } from "@ethersproject/abi";
import { BigNumberish } from "@ethersproject/bignumber";
import { Transaction, VaultAsset } from "../@types";
import Erc20Abi from "../abis/erc20.json";

const erc20ApproveTx = (vaultAsset: VaultAsset, amount: BigNumberish): Transaction => {
  const erc20Interface: Interface = new Interface(Erc20Abi as JsonFragment[]);

  const approvalTransaction: Transaction = {
    data: erc20Interface.encodeFunctionData("approve", [vaultAsset.vaultContractAddress, amount]),
    to: vaultAsset.erc20address,
    value: 0,
  };

  return approvalTransaction;
};

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
