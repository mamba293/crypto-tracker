import { useState, useRef } from "react";
import {
  Select,
  Space,
  Divider,
  Result,
  Form,
  InputNumber,
  Button,
  DatePicker,
} from "antd";
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not valid number",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
    min: "${label} cannot be less than ${min}",
  },
};

const numberFieldRules = [
  { required: true },
  { type: "number", min: 0, max: 100000000 },
];

export default function AddAssetInfo({ onClose }) {
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [form] = Form.useForm();
  const [submit, setSubmit] = useState(false);
  const assetRef = useRef()

  if (submit) {
    return (
      <Result
        status="success"
        title="Nes Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Go console
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      ></Result>
    );
  }

  function onFinish(values) {
    console.log(values);
    const newAsset={
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?. $d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmit(true);
    addAsset(newAsset)
  }

  function handleAmountChange(value) {
    form.setFieldsValue({
      total: +(value * form.getFieldValue("price")).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        placeholder="Choose crypto"
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.value}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  return (
    <>
      <CoinInfo coin={coin} />
      <Divider />

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        style={{ width: 550 }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{
          price: +coin.price.toFixed(2),
        }}
      >
        <Form.Item label="Amount" name="amount" rules={numberFieldRules}>
          <InputNumber
            placeholder="Enter amount of coins"
            onChange={handleAmountChange}
            size="middle"
            style={{ width: "100%" }}
            controls={false}
          />
        </Form.Item>

        <Form.Item label="Date & Time" name="date" rules={[{ required: true }]}>
          <DatePicker showTime />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={numberFieldRules}>
          <InputNumber
            size="middle"
            style={{ width: "100%" }}
            controls={false}
            onChange={handlePriceChange}
          />
        </Form.Item>

        <Form.Item label="Total" name="total" rules={numberFieldRules}>
          <InputNumber
            disabled
            size="middle"
            style={{ width: "100%" }}
            controls={false}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
