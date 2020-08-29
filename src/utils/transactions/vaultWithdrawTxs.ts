import { Interface } from "@ethersproject/abi";
import { BigNumberish } from "@ethersproject/bignumber";

import { Transaction, VaultAsset } from "../../@types";

const vaultDepositTx = (poolAsset: VaultAsset, amount: BigNumberish): Transaction => {
  const vaultAddress: string = poolAsset.vaultContractAddress as string;
  const vaultInterface: Interface = new Interface(poolAsset.vaultContractABI);

  const depositTransaction: Transaction = {
    data: vaultInterface.encodeFunctionData("withdraw", [amount]),
    to: vaultAddress,
    value: 0,
  };

  return depositTransaction;
};

const vaultDepositTxs = (poolAsset: VaultAsset, amount: BigNumberish): Transaction[] => [
  vaultDepositTx(poolAsset, amount),
];

export default vaultDepositTxs;
