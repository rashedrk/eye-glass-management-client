import { Button, Card, Image } from "antd";
import { TEyeglass } from "../../../types";
import Title from "antd/es/typography/Title";
import { Typography } from "antd";
import { useState } from "react";
import SellModal from "../Modals/SellModal";
import { ShoppingCartOutlined } from "@ant-design/icons";
const { Text } = Typography;
const EyeglassCard = ({ eyeglass }: { eyeglass: TEyeglass }) => {
  const { name, price, quantity } = eyeglass;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        bordered
        size="small"
        cover={<Image src={eyeglass.img} />}
        style={{ textAlign: "left", marginBottom: 10 }}
        actions={[
          <Button size="middle" onClick={() => setIsModalOpen(true)} type="primary" icon={<ShoppingCartOutlined />}>  
            Sell
          </Button>,
        ]}
      >
        <Title level={5}>{name}</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={{ color: '#e91e63', fontSize: 16 }}>{quantity} pcs</Text>
          <Text style={{ color: '#009688', fontWeight: 'bold', fontSize: 16 }}>${price}</Text>
        </div>
      </Card>
      <SellModal
        eyeglass={eyeglass}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default EyeglassCard;
