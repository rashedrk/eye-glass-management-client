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
          <Card
            style={{
              backgroundColor: "#FF9F43",
              borderRadius: "8px",
              color: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <FileTextOutlined
                style={{
                  fontSize: "24px",
                  color: "white",
                  marginRight: "10px",
                  padding: "8px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
              />
              <Statistic
                title={<span style={{ color: "white" }}>Total Sales</span>}
                value={48988078}
                precision={0}
                valueStyle={{ color: "white", fontWeight: 700 }}
                prefix="$"
                suffix={
                  <span
                    style={{
                      fontSize: "14px",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      marginLeft: "10px",
                    }}
                  >
                    +22%
                  </span>
                }
              />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              backgroundColor: "#132C4A",
              borderRadius: "8px",
              color: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <SyncOutlined
                style={{
                  fontSize: "24px",
                  color: "white",
                  marginRight: "10px",
                  padding: "8px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
              />
              <Statistic
                title={
                  <span style={{ color: "white" }}>Total Sales Return</span>
                }
                value={16478145}
                precision={0}
                valueStyle={{ color: "white", fontWeight: 700 }}
                prefix="$"
                suffix={
                  <span
                    style={{
                      fontSize: "14px",
                      backgroundColor: "rgba(255,0,0,0.2)",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      marginLeft: "10px",
                      color: "#ff6b6b",
                    }}
                  >
                    -22%
                  </span>
                }
              />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              backgroundColor: "#00A389",
              borderRadius: "8px",
              color: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <GiftOutlined
                style={{
                  fontSize: "24px",
                  color: "white",
                  marginRight: "10px",
                  padding: "8px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
              />
              <Statistic
                title={<span style={{ color: "white" }}>Total Purchase</span>}
                value={24145789}
                precision={0}
                valueStyle={{ color: "white", fontWeight: 700 }}
                prefix="$"
                suffix={
                  <span
                    style={{
                      fontSize: "14px",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      marginLeft: "10px",
                    }}
                  >
                    +22%
                  </span>
                }
              />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              backgroundColor: "#3366FF",
              borderRadius: "8px",
              color: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <CheckSquareOutlined
                style={{
                  fontSize: "24px",
                  color: "white",
                  marginRight: "10px",
                  padding: "8px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                }}
              />
              <Statistic
                title={
                  <span style={{ color: "white" }}>Total Purchase Return</span>
                }
                value={18458747}
                precision={0}
                valueStyle={{ color: "white", fontWeight: 700 }}
                prefix="$"
                suffix={
                  <span
                    style={{
                      fontSize: "14px",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      marginLeft: "10px",
                    }}
                  >
                    +22%
                  </span>
                }
              />
            </div>
          </Card>
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
