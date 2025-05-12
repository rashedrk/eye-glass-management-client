import { Card, Statistic } from "antd";

const DashboardTopCard = ({
  Icon,
  title,
  value,
  backgroundColor,
}: {
  Icon: React.ReactNode;
  title: string;
  value: number;
  backgroundColor: string;
}) => {
  return (
    <Card
      style={{
        backgroundColor: backgroundColor,
        borderRadius: "8px",
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            fontSize: "24px",
            color: "white",
            marginRight: "10px",
            padding: "8px",
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Icon}
        </div>
        <Statistic
          title={
            <span style={{ color: "white", fontSize: "16px" }}>{title}</span>
          }
          value={value}
          precision={0}
          valueStyle={{ color: "white", fontWeight: 600 }}
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
  );
};

export default DashboardTopCard;
