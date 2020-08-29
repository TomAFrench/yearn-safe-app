import { Contract } from "@ethersproject/contracts";
import { Provider } from "@ethersproject/providers";
import { VaultAsset } from "../@types";

const getAPY = async (provider: Provider, asset: VaultAsset): Promise<number> => {
  if (asset.vaultContractAddress === null) {
    return 0;
  }
  if (asset.measurement == null) {
    return 0;
  }
  try {
    const block = await provider.getBlockNumber();
    const vault = new Contract(asset.vaultContractAddress, asset.vaultContractABI, provider);
    let balance = await vault.getPricePerFullShare();

    balance -= asset.measurement;
    balance /= 1e18;
    const diff = block - asset.lastMeasurement;

    balance /= diff;
    balance *= 2425846;

    return parseFloat(balance);
  } catch (e) {
    console.log(e);
    return 0;
  }
};

export default getAPY;
