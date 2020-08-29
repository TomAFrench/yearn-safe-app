import { Interface } from "@ethersproject/abi";

import { BigNumberish } from "@ethersproject/bignumber";
import { Transaction, VaultAsset } from "../../@types";
import Erc20Abi from "../../abis/erc20.json";

const erc20ApproveTx = (poolAsset: VaultAsset, amount: BigNumberish): Transaction => {
  const erc20Interface: Interface = new Interface(Erc20Abi as any);

  const approvalTransaction: Transaction = {
    data: erc20Interface.encodeFunctionData("approve", [poolAsset.vaultContractAddress, amount]),
    to: poolAsset.erc20address,
    value: 0,
  };

  return approvalTransaction;
};

const vaultDepositTx = (poolAsset: VaultAsset, amount: BigNumberish): Transaction => {
  const vaultAddress: string = poolAsset.vaultContractAddress as string;
  const vaultInterface: Interface = new Interface(poolAsset.vaultContractABI);

  const depositTransaction: Transaction = {
    data: vaultInterface.encodeFunctionData("deposit", [amount]),
    to: vaultAddress,
    value: 0,
  };

  return depositTransaction;
};

const vaultDepositTxs = (poolAsset: VaultAsset, amount: BigNumberish): Transaction[] => {
  const approvalTransaction = erc20ApproveTx(poolAsset, amount);
  const depositTransaction = vaultDepositTx(poolAsset, amount);

  return [approvalTransaction, depositTransaction];
};

export default vaultDepositTxs;
