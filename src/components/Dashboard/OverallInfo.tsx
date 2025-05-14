import { CalendarOutlined } from "@ant-design/icons";
import {
  ExclamationCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Divider, Row, Select } from "antd";
import { Cell, Tooltip } from "recharts";
import { Pie } from "recharts";
import { PieChart } from "recharts";
import { ResponsiveContainer } from "recharts";

const OverallInfo = () => {
  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "8px", color: "#3366FF" }}>
            <ExclamationCircleOutlined />
          </span>
          <span style={{ fontWeight: 500 }}>Sales & Purchase</span>
        </div>
      }
      style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      bodyStyle={{ padding: "16px" }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <div
            style={{
              backgroundColor: "#F9FAFB",
              padding: "20px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #E0E0E0",
            }}
          >
            <UserOutlined
              style={{
                fontSize: "24px",
                color: "#3366FF",
                marginBottom: "10px",
              }}
            />
            <span style={{ color: "#646B76" }}>Suppliers</span>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>1000</span>
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              backgroundColor: "#F9FAFB",
              padding: "20px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #E0E0E0",
            }}
          >
            <TeamOutlined
              style={{
                fontSize: "24px",
                color: "#E04F16",
                marginBottom: "10px",
              }}
            />
            <span style={{ color: "#646B76" }}>Customer</span>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>3422</span>
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              backgroundColor: "#F9FAFB",
              padding: "20px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #E0E0E0",
            }}
          >
            <UserOutlined
              style={{
                fontSize: "24px",
                color: "#0E9384",
                marginBottom: "10px",
              }}
            />
            <span style={{ color: "#646B76" }}>Orders</span>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>487</span>
          </div>
        </Col>
      </Row>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "16px", fontWeight: "600" }}>
          Customers Overview
        </p>
        <Select
          defaultValue="today"
          style={{ width: 100 }}
          suffixIcon={<CalendarOutlined />}
          options={[
            { value: "today", label: "Today" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
          ]}
        />
      </div>
      <Row gutter={16} style={{ height: 200, alignItems: "center" }}>
        <Col span={12}>
          <ResponsiveContainer minHeight={200}>
            <PieChart>
              <Pie
                data={[
                  { name: "Return", value: 21 },
                  { name: "First Time", value: 25 },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={55}
                paddingAngle={4}
                dataKey="value"
              >
                <Cell key="return" fill="#0E9384" />
                <Cell key="firsttime" fill="#E04F16" />
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col span={12}>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>
                5.5K
              </div>
              <div style={{ color: "#E04F16", fontSize: 16 }}>First Time</div>
              <div
                style={{
                  color: "#16A34A",
                  background: "#E6F4EA",
                  borderRadius: 4,
                  padding: "2px 8px",
                  display: "inline-block",
                  marginTop: 6,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                25% <span style={{ fontSize: 11 }}>↗</span>
              </div>
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>
                3.5K
              </div>
              <div style={{ color: "#0E9384", fontSize: 16 }}>Return</div>
              <div
                style={{
                  color: "#16A34A",
                  background: "#E6F4EA",
                  borderRadius: 4,
                  padding: "2px 8px",
                  display: "inline-block",
                  marginTop: 6,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                21% <span style={{ fontSize: 11 }}>↗</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default OverallInfo;
