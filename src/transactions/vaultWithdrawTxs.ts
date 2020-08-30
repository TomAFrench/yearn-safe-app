import { Interface } from "@ethersproject/abi";
import { BigNumberish } from "@ethersproject/bignumber";

import { Transaction, VaultAsset } from "../@types";

const vaultDepositTx = (vaultAsset: VaultAsset, amount: BigNumberish): Transaction => {
  const vaultAddress: string = vaultAsset.vaultContractAddress as string;
  const vaultInterface: Interface = new Interface(vaultAsset.vaultContractABI);

  const depositTransaction: Transaction = {
    data: vaultInterface.encodeFunctionData("withdraw", [amount]),
    to: vaultAddress,
    value: 0,
  };

  return depositTransaction;
};

const vaultDepositTxs = (vaultAsset: VaultAsset, amount: BigNumberish): Transaction[] => [
  vaultDepositTx(vaultAsset, amount),
];

export default vaultDepositTxs;
