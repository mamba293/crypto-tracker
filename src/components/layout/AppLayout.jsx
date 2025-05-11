import { Layout, Spin } from "antd";
import AppHeader from "./AppHEader";
import AppSlider from "./AppSider";
import AppContent from "./AppContent";
import { useContext } from "react";
import { CryptoContext } from "../../context/crypto-context";

const layoutStyle = {
  borderRadius: 8,
};

export default function AppLayout() {
  const { isLoading } = useContext(CryptoContext);

  if (isLoading === true) return <Spin fullscreen />;

  return (
    <Layout style={layoutStyle}>
      <AppHeader />
      <Layout>
        <AppSlider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
