import { Layout, Typography } from "antd";
import CryptoContextProvider, { useCrypto } from "../../context/crypto-context";
import { Portal } from "@mui/material";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60 px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

const AppContent = () => {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, coin)=>{
    acc[coin.id] = coin.price
    return acc
  },{

  })

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => {
            return asset.amount * cryptoPriceMap[asset.id];
          })
          .reduce((acc, v) => 
            (acc += v)
          , 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart/>
      <AssetsTable/>
    </Layout.Content>
  );
};

export default AppContent;
