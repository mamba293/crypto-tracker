import {createContext, useState,useEffect} from "react";
import {percentDifference} from '../components/utils/percant';
import { fetchAssets, fetchCrypto } from "../components/utils/api";

export const CryptoContext = createContext({
    assets: [],
    isLoading: false,
    crypto: [],
})

export default function CryptoContextProvider({children}) {
    const [isLoading, setIsLoading] = useState(false);
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])
    
    useEffect(()=>{
        async function preload(){
          setIsLoading(true)
          const {result} = await fetchCrypto();
          const assets = await fetchAssets();

          setCrypto(result); 
          setAssets(assets.map((asset)=> {
              const coin = result.find(c => c.id === asset.id)
              return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                ...asset
              }
          }));
          setIsLoading(false);
        }

        preload() 
    }, [])
    
    return(
        <CryptoContext.Provider value={{isLoading, assets}}>
            {children}
        </CryptoContext.Provider>
    )
}
