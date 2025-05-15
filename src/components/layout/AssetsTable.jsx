import { Button, Space, Table, Typography } from "antd";
import { useCrypto } from "./../../context/crypto-context";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (_, render) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src={render.icon}
          alt="icon"
          style={{ width: "30px", height: "30px" }}
        />
        {render.name}
      </div>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];
export default function AssetsTable() {
  const { assets, crypto } = useCrypto();

  const data = assets.map((a) => ({
    key: a.id,
    name: a.id,
    price: a.price,
    amount: a.amount,
  }));

  const dataWithIcon = data.map((asset) => {
    const cryptoIcon = crypto.find((c) => c.id === asset.key);
    if (cryptoIcon)
      return {
        ...asset,
        icon: cryptoIcon.icon,
      };
  });

  return (
    <div
      style={{
        marginTop: 40,
      }}
    >
      <Table pagination={false} columns={columns} dataSource={dataWithIcon} />
    </div>
  );
}
