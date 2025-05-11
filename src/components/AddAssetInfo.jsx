import { useState} from "react";
import {
  Select,
  Space,
  Typography,
  Divider,
  Flex,
  Form,
  InputNumber,
  Button,
  DatePicker,
} from "antd";
import { useCrypto } from "../context/crypto-context";

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

const numberFieldRules = [{ required: true }, { type: "number", min: 0, max: 100000000 }];

export default function AddAssetInfo() {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [form] = Form.useForm();

  function handleAmountChange(value){
    form.setFieldsValue({
        total: +(value * form.getFieldValue('price')).toFixed(2)
    })
  }

  function handlePriceChange(value){
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
        total: +(amount * value).toFixed(2)
    }) 
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

  function onFinish(values) {
    console.log(values);
  }

  return (
    <>
      <Flex align="center">
        <img src={coin.icon} alt={coin.name} style={{ width: 40 }} />
        <Typography.Title level={2} style={{ margin: 0, marginLeft: 10 }}>
          {coin.name}
        </Typography.Title>
      </Flex>

      <Divider />

      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        style={{ width: 550 }}
        onFinish={onFinish}
        validateMessages={validateMessages} 
        initialValues={{
            price: +(coin.price.toFixed(2))
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

        <Form.Item
          label="Date & Time"
          name="date"
          rules={[{ required: true }]}
        >
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

        <Form.Item label="Total"  name="total" rules={numberFieldRules}>
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
