import { BigNumberish } from "@ethersproject/bignumber";

export type HumanReadableVault = {
  id: string;
  apy: string;
  symbol: string;
  balance: BigNumberish;
  vaultBalance: BigNumberish;
  humanBalance: string;
  humanVaultBalance: string;
};
