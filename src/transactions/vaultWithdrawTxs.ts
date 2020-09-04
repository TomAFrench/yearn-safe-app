import { Interface } from "@ethersproject/abi";
import { BigNumberish } from "@ethersproject/bignumber";

import { Transaction, VaultAsset } from "../@types";

const vaultWithdrawTx = (vaultAsset: VaultAsset, amount: BigNumberish): Transaction => {
  const vaultAddress: string = vaultAsset.vaultContractAddress as string;
  const vaultInterface: Interface = new Interface(vaultAsset.vaultContractABI);

  const withdrawTransaction: Transaction = {
    data: vaultInterface.encodeFunctionData("withdraw", [amount]),
    to: vaultAddress,
    value: "0",
  };

  return withdrawTransaction;
};

const vaultWithdrawTxs = (vaultAsset: VaultAsset, amount: BigNumberish): Transaction[] => {
  const depositTransaction = vaultWithdrawTx(vaultAsset, amount);

  return [depositTransaction];
};

export default vaultWithdrawTxs;
