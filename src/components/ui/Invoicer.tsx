/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Descriptions, Divider, Row } from "antd";
import Title from "antd/es/typography/Title";
import { Typography } from "antd";

const { Text } = Typography;

const Invoicer = ({ invoiceDetails }: any) => {
  const { product, buyer, quantity, price, dateOfSale } = invoiceDetails;
  const items = [
    {
      key: "1",
      label: "Name",
      children: product,
    },
    {
      key: "2",
      label: "Quantity",
      children: quantity,
    },
    {
      key: "3",
      label: "Price",
      children: `$${price}`,
    },
  ];
  return (
    <Row style={{ margin: 15 }}>
      <Col span={24} style={{ textAlign: "center" }}>
        <Title level={3} style={{ fontWeight: "bold" }}>
          Invoice
        </Title>
      </Col>
      <Col span={12}>
        <Title level={4} style={{ textTransform: "uppercase" }}>
          {buyer}
        </Title>
      </Col>
      <Col span={12} style={{ textAlign: "right" }}>
        <Title level={5}>Date</Title>
        <Text>{dateOfSale}</Text>
      </Col>
      <Col span={24}>
        <Descriptions
          layout="vertical"
          bordered
          items={items}
          style={{ marginTop: 30 }}
        />
      </Col>
      <Col span={24} style={{ textAlign: "right" }}>
        <Title
          level={5}
          style={{ fontWeight: "bold", marginTop: 20, paddingRight: 15 }}
        >
          Total: ${quantity * price}
        </Title>
      </Col>
      <Divider />
      <Col span={24} style={{ textAlign: "center", marginBottom: 30 }}>
        <Text type="secondary">This bill is generated Automatic </Text>
      </Col>
    </Row>
  );
};

export default Invoicer;
