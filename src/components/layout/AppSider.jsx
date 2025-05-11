import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalizer } from "./../../utils/capitalize";
import { useContext } from "react";
import { CryptoContext } from "../../context/crypto-context";

const siderStyle = {
  padding: "1rem",
};

const AppSider = () => {
  const { assets } = useContext(CryptoContext);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitalizer(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: "TotalProfit", value: asset.totalProfit, withTag: true },
              { title: "AssetAmount", value: asset.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{item.title}</span>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && typeof item.value === "number" && (
                    <Typography>{item.value.toFixed(2)}$</Typography>
                  )}
                </div>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
};

export default AppSider;
