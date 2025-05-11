import { createContext, useState, useEffect, useContext, Result } from "react";
import { percentDifference } from "../utils/percantage";
import { fetchAssets, fetchCrypto } from "./../utils/api";

export const CryptoContext = createContext({
  assets: [],
  isLoading: false,
  crypto: [],
});

export default function CryptoContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setIsLoading(true);
      const { result } = await fetchCrypto();
      const assets = await fetchAssets();

      setCrypto(result);
      setAssets(mapAssets(assets, result));
      setIsLoading(false);
    }

    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContext.Provider value={{ isLoading, assets, crypto, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export function useCrypto() {
  return useContext(CryptoContext);
}
