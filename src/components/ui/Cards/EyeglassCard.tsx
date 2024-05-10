import { Button, Card, Image } from "antd";
import { TEyeglass } from "../../../types";
import Title from "antd/es/typography/Title";
import {  Typography } from 'antd';
const { Text } = Typography;
const EyeglassCard = ({ eyeglass }: { eyeglass: TEyeglass }) => {
  const { name, price, quantity } = eyeglass;
  return (
    <Card
      cover={<Image height={140} src={eyeglass.img} />}
      style={{textAlign: 'center', marginBottom: 10}}
      actions={[<Button type="primary">Sell</Button>]}
    >
        <Title level={4}>${price}</Title>
        <Title level={5}>{name}</Title>
        <Text>Available: {quantity}</Text>
        
    </Card>
  );
};

export default EyeglassCard;
