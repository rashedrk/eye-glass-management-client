import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, theme } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  TooltipProps as RechartsTooltipProps,
} from "recharts";

interface PeriodButtonProps {
  label: string;
  active?: boolean;
}

interface StatsBoxProps {
  title: string;
  value: string;
  color: string;
}

const SalesAndPurchaseChart = () => {
  const { token } = theme.useToken();
  const primaryColor = token.colorPrimary;
  const primaryColorLowOpacity = `${primaryColor}70`; // 20% opacity

  // Sample data
  const data = [
    { time: "2 am", purchase: 40, sales: 18 },
    { time: "4 am", purchase: 30, sales: 20 },
    { time: "6 am", purchase: 30, sales: 10 },
    { time: "8 am", purchase: 48, sales: 18 },
    { time: "10 am", purchase: 38, sales: 25 },
    { time: "12 am", purchase: 45, sales: 18 },
    { time: "14 pm", purchase: 30, sales: 10 },
    { time: "16 pm", purchase: 30, sales: 20 },
    { time: "18 pm", purchase: 50, sales: 40 },
    { time: "20 pm", purchase: 28, sales: 8 },
    { time: "22 pm", purchase: 40, sales: 30 },
    { time: "24 pm", purchase: 30, sales: 20 },
  ];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: RechartsTooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            padding: "8px",
            backgroundColor: "white",
            borderRadius: "4px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ marginBottom: "8px", fontWeight: 500 }}>{label}</div>
          {payload.map((entry, index) => (
            <div
              key={index}
              style={{
                marginBottom: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: entry.color,
                    marginRight: 8,
                  }}
                />
                <span>{entry.name}</span>
              </div>
              <span style={{ fontWeight: "bold" }}>{`${entry.value}K`}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "8px", color: primaryColor }}>
            <ShoppingCartOutlined />
          </span>
          <span style={{ fontWeight: 500 }}>Sales & Purchase</span>
        </div>
      }
      extra={
        <div style={{ display: "flex", gap: "8px" }}>
          <PeriodButton label="1D" active={true} />
          <PeriodButton label="1W" active={false} />
          <PeriodButton label="1M" active={false} />
          <PeriodButton label="3M" active={false} />
          <PeriodButton label="6M" active={false} />
          <PeriodButton label="1Y" active={false} />
        </div>
      }
      style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      bodyStyle={{ padding: "16px" }}
    >
      <div style={{ display: "flex", marginBottom: "20px", gap: "16px" }}>
        <StatsBox
          title="Total Purchase"
          value="3K"
          color={primaryColorLowOpacity}
        />
        <StatsBox title="Total Sales" value="1K" color={primaryColor} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis
            tickFormatter={(value) => `${value}K`}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="sales"
            name="Total Sales"
            stackId="a"
            fill={primaryColor}
          />
          <Bar
            dataKey="purchase"
            name="Total Purchase"
            stackId="a"
            fill={primaryColorLowOpacity}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

// Helper components for the period buttons
const PeriodButton = ({ label, active }: PeriodButtonProps) => {
  const { token } = theme.useToken();
  return (
    <button
      style={{
        padding: "4px 12px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: active ? token.colorPrimary : "#f5f5f5",
        color: active ? "white" : "#666",
        cursor: "pointer",
        fontWeight: active ? "bold" : "normal",
        fontSize: "13px",
      }}
    >
      {label}
    </button>
  );
};

// Helper component for the stats boxes
const StatsBox = ({ title, value, color }: StatsBoxProps) => (
  <div
    style={{
      padding: "12px 16px",
      borderRadius: "6px",
      border: "1px solid #f0f0f0",
      minWidth: "120px",
      backgroundColor: "#fff",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "8px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "8px",
          height: "8px",
          backgroundColor: color,
          marginRight: "8px",
          borderRadius: "50%",
        }}
      />
      <span style={{ color: "#666", fontSize: "13px" }}>{title}</span>
    </div>
    <div style={{ fontSize: "20px", fontWeight: "bold" }}>{value}</div>
  </div>
);

export default SalesAndPurchaseChart;
