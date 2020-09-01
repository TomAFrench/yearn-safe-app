import { Interface } from "@ethersproject/abi";
import { Transaction, VaultAsset } from "../@types";

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
  const withdrawTransaction = vaultWithdrawAllTx(vaultAsset);

  return [withdrawTransaction];
};

export default vaultWithdrawAllTxs;
