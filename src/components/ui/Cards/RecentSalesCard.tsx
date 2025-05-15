import { CalendarOutlined } from "@ant-design/icons";
import { Card, Select } from "antd";
import { ShoppingCart } from "lucide-react";
import { theme } from "antd";
import { getStatusBadge } from "../../../utils/getStatusBadge";
const { useToken } = theme;

const products = [
  {
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=48&h=48",
    name: "Charger Cable - Lighting",
    price: 187,
    brand: "Apple",
    status: "processing",
    createdAt: "2024-01-01",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=48&h=48",
    name: "Yves Saint Eau De Parfum",
    price: 145,
    brand: "Samsung",
    status: "onhold",
    createdAt: "2024-01-01",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=48&h=48",
    name: "Apple Airpods 2",
    price: 458,
    brand: "Apple",
    status: "completed",
    createdAt: "2024-01-01",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48",
    name: "Vacuum Cleaner",
    price: 139,
    brand: "Samsung",
    status: "cancelled",
    createdAt: "2024-01-01",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=facearea&w=48&h=48",
    name: "Samsung Galaxy S21 Fe 5g",
    price: 898,
    brand: "Samsung",
    status: "completed",
    createdAt: "2024-01-01",
  },
];

const RecentSalesCard = () => {
  const { token } = useToken();
  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              marginRight: "8px",
              color: "#FD4395",
              backgroundColor: "#FD43951A",
              padding: "8px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingCart size={16} />
          </span>
          <span style={{ fontWeight: 500 }}>Recent Sales</span>
        </div>
      }
      extra={
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
      }
      style={{ borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      bodyStyle={{ padding: "16px" }}
    >
      <div>
        {products.map((product, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: idx !== products.length - 1 ? 10 : 0,
              paddingBottom: 16,
              borderBottom:
                idx !== products.length - 1 ? "1px solid #f0f0f0" : "none",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                objectFit: "cover",
                marginRight: 10,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>
                {product.name}
              </div>
              <div style={{ color: "#888", fontSize: 13 }}>
                {product.brand}
                <span style={{ margin: "0 6px", color: token?.colorPrimary }}>
                  •
                </span>{" "}
                ${product.price}{" "}
              </div>
            </div>
            <div style={{ display: "flex",flexDirection: "column", alignItems: "center", gap:5 }}>
              <span style={{fontSize:12, color:"#888" }}>{product.createdAt}</span>
              <div>{getStatusBadge(product.status)}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentSalesCard;
