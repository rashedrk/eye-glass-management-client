import { Card } from "antd";
import ViewAll from "../ViewAll";


const DashboardInfoCard = ({
  value,
  title,
  icon,
  link,
  percentage,
  iconColor,
}: {
  value: number;
  title: string;
  icon: React.ReactNode;
  link: string;
  percentage: number;
  iconColor: string;
}) => {

  const percentageColor = percentage >= 0 ? "#4CAF50" : "#F44336"; // Green for positive, Red for negative
  
  // Determine the prefix symbol for the percentage
  const percentagePrefix = percentage >= 0 ? "+" : "";

  return (
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
            ${value.toLocaleString()}
          </h2>
          <p style={{ margin: "4px 0 0 0", color: "#666" }}>{title}</p>
        </div>
        <div
          style={{
            backgroundColor: `${iconColor}1A`, // 1A = 10% opacity in hex
            borderRadius: "8px",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            color: iconColor,
          }}
        >
          {icon}
        </div>
      </div>
      <div
        style={{
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span style={{ color: percentageColor, fontWeight: 500 }}>
            {percentagePrefix}
            {percentage}%
          </span>
          <span style={{ color: "#666" }}> vs Last Month</span>
        </div>
        <ViewAll link={link} />
      </div>
    </Card>
  );
};

export default DashboardInfoCard;
