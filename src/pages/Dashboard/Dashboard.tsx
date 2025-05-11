import { Card, Col, Row, Statistic } from "antd";
import { useGetAllEyeglassesQuery } from "../../redux/features/eyeGlass/eyeglassApi";

const Dashboard = () => {
  const { data: eyeglassData } = useGetAllEyeglassesQuery([]);

  const totalEyeglasses = eyeglassData?.data?.length || 0;
  const totalValue =
    eyeglassData?.data?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) || 0;

  return (
    <div>
      <h2>Dashboard</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic title="Total Eyeglasses" value={totalEyeglasses} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Total Inventory Value"
              value={totalValue}
              prefix="$"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
