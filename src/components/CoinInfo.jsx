import { Typography, Flex } from "antd";

export default function CoinInfo({coin, withSymbol}) {
  return (
    <Flex align="center">
      <img src={coin.icon} alt={coin.name} style={{ width: 40 }} />
      <Typography.Title level={2} style={{ margin: 0, marginLeft: 10, marginRight: 10 }}>
      ({withSymbol && coin.symbol}) {coin.name}
      </Typography.Title>
    </Flex>
  );
}
