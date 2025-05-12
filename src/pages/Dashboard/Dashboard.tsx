import { Card, Col, Row, Statistic } from "antd";
import { useGetAllEyeglassesQuery } from "../../redux/features/eyeGlass/eyeglassApi";
import {
  FileTextOutlined,
  SyncOutlined,
  GiftOutlined,
  CheckSquareOutlined,
  DatabaseOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  NumberOutlined,
} from "@ant-design/icons";
import { CSSProperties } from "react";
import DashboardTopCard from "../../components/ui/Cards/DashboardTopCard";

// Define styles
const styles = {
  viewAllLink: {
    marginLeft: "16px",
    color: "#333",
    textDecoration: "none",
    transition: "color 0.3s ease",
    ":hover": {
      color: "#1890ff",
    },
  } as CSSProperties,
};

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
          <Card style={{ borderRadius: "8px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
                  $8,458,798
                </h2>
                <p style={{ margin: "4px 0 0 0", color: "#666" }}>Profit</p>
                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "16px",
                    borderTop: "1px solid #f0f0f0",
                  }}
                >
                  <span style={{ color: "#4CAF50", fontWeight: 500 }}>
                    +35%
                  </span>
                  <span style={{ color: "#666" }}> vs Last Month</span>
                  <a
                    href="#"
                    style={styles.viewAllLink}
                    className="view-all-link"
                  >
                    View All
                  </a>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(0, 183, 195, 0.1)",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <DatabaseOutlined
                  style={{ fontSize: "24px", color: "#00B7C3" }}
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderRadius: "8px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
                  $48,988,780
                </h2>
                <p style={{ margin: "4px 0 0 0", color: "#666" }}>
                  Invoice Due
                </p>
                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "16px",
                    borderTop: "1px solid #f0f0f0",
                  }}
                >
                  <span style={{ color: "#4CAF50", fontWeight: 500 }}>
                    +35%
                  </span>
                  <span style={{ color: "#666" }}> vs Last Month</span>
                  <a
                    href="#"
                    style={styles.viewAllLink}
                    className="view-all-link"
                  >
                    View All
                  </a>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(0, 183, 195, 0.1)",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <ClockCircleOutlined
                  style={{ fontSize: "24px", color: "#00B7C3" }}
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderRadius: "8px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
                  $8,980,097
                </h2>
                <p style={{ margin: "4px 0 0 0", color: "#666" }}>
                  Total Expenses
                </p>
                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "16px",
                    borderTop: "1px solid #f0f0f0",
                  }}
                >
                  <span style={{ color: "#4CAF50", fontWeight: 500 }}>
                    +41%
                  </span>
                  <span style={{ color: "#666" }}> vs Last Month</span>
                  <a
                    href="#"
                    style={styles.viewAllLink}
                    className="view-all-link"
                  >
                    View All
                  </a>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255, 153, 102, 0.1)",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <DollarOutlined
                  style={{ fontSize: "24px", color: "#FF9966" }}
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ borderRadius: "8px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
                  $78,458,798
                </h2>
                <p style={{ margin: "4px 0 0 0", color: "#666" }}>
                  Total Payment Returns
                </p>
                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "16px",
                    borderTop: "1px solid #f0f0f0",
                  }}
                >
                  <span style={{ color: "#FF5252", fontWeight: 500 }}>
                    -20%
                  </span>
                  <span style={{ color: "#666" }}> vs Last Month</span>
                  <a
                    href="#"
                    style={styles.viewAllLink}
                    className="view-all-link"
                  >
                    View All
                  </a>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(102, 51, 153, 0.1)",
                  borderRadius: "8px",
                  padding: "12px",
                }}
              >
                <NumberOutlined
                  style={{ fontSize: "24px", color: "#663399" }}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
