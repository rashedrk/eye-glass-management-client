import { Col, Row } from "antd";
// import { useGetAllEyeglassesQuery } from "../../redux/features/eyeGlass/eyeglassApi";
import {
  FileTextOutlined,
  SyncOutlined,
  GiftOutlined,
  CheckSquareOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import DashboardTopCard from "../../components/ui/Cards/DashboardTopCard";
import DashboardInfoCard from "../../components/ui/Cards/DashboardInfoCard";
import SalesAndPurchaseChart from "../../components/ui/Charts/SalesAndPurchaseChart";
import OverallInfo from "../../components/Dashboard/OverallInfo";
import TopSellingProducts from "../../components/ui/Cards/TopSellingProducts";
import LowStockProductsCard from "../../components/ui/Cards/LowStockProductsCard";
import RecentSalesCard from "../../components/ui/Cards/RecentSalesCard";
const Dashboard = () => {
  // const { data: eyeglassData } = useGetAllEyeglassesQuery([]);

  // const totalEyeglasses = eyeglassData?.data?.length || 0;
  // const totalValue =
  //   eyeglassData?.data?.reduce(
  //     (acc, item) => acc + item.price * item.quantity,
  //     0
  //   ) || 0;

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <DashboardTopCard
            Icon={<FileTextOutlined />}
            title="Total Sales"
            value={48988078}
            backgroundColor="#FF9F43"
          />
        </Col>
        <Col span={6}>
          <DashboardTopCard
            Icon={<SyncOutlined />}
            title="Total Sales Return"
            value={16478145}
            backgroundColor="#132C4A"
          />
        </Col>
        <Col span={6}>
          <DashboardTopCard
            Icon={<GiftOutlined />}
            title="Total Purchase"
            value={24145789}
            backgroundColor="#00A389"
          />
        </Col>
        <Col span={6}>
          <DashboardTopCard
            Icon={<CheckSquareOutlined />}
            title="Total Purchase Return"
            value={18458747}
            backgroundColor="#3366FF"
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={6}>
          <DashboardInfoCard
            value={2345678}
            title="Total Sales"
            icon={<FileTextOutlined />}
            link="/sales"
            percentage={35}
            iconColor="#FF9F43"
          />
        </Col>
        <Col span={6}>
          <DashboardInfoCard
            value={48988780}
            title="Invoice Due"
            icon={<ClockCircleOutlined />}
            link="/invoice-due"
            percentage={35}
            iconColor="#00B7C3"
          />
        </Col>
        <Col span={6}>
          <DashboardInfoCard
            value={89242306}
            title="Total Expenses"
            icon={<DollarOutlined />}
            link="/expenses"
            percentage={41}
            iconColor="#FF9966"
          />
        </Col>
        <Col span={6}>
          <DashboardInfoCard
            value={78458798}
            title="Total Payment Returns"
            icon={<NumberOutlined />}
            link="/payment-returns"
            percentage={-25}
            iconColor="#663399"
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={16}>
          <SalesAndPurchaseChart />
        </Col>
        <Col span={8}>
          <OverallInfo />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={8}>
          <TopSellingProducts/>
        </Col>
        <Col span={8}>
          <LowStockProductsCard/>
        </Col>
        <Col span={8}>
          <RecentSalesCard/>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
