import { Button, Card, Image } from "antd";
import { TEyeglass } from "../../../types";
import Title from "antd/es/typography/Title";
import { Typography } from "antd";
import { useState } from "react";
import SellModal from "../Modals/SellModal";
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
        cover={<Image height={140} src={eyeglass.img} />}
        style={{ textAlign: "center", marginBottom: 10 }}
        actions={[<Button onClick={() => setIsModalOpen(true)} type="primary">Sell</Button>]}
      >
        <Title level={4}>${price}</Title>
        <Title level={5}>{name}</Title>
        <Text>Available: {quantity}</Text>
      </Card>
      <SellModal eyeglass={eyeglass} isModalOpen={isModalOpen} handleCancel={handleCancel}/>
    </>
  );
};

export default EyeglassCard;
