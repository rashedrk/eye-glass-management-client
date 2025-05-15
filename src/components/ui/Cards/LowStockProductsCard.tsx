import { Card } from "antd";
import { TriangleAlert } from "lucide-react";
import ViewAll from "../ViewAll";

const products = [
  {
    id: 123143,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=48&h=48",
    name: "Charger Cable - Lighting",
    stock: 10,
  },
  {
    id: 23873,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=48&h=48",
    name: "Yves Saint Eau De Parfum",
    stock: 10,
  },
  {
    id: 345345,
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=48&h=48",
    name: "Apple Airpods 2",
    stock: 5,
  },
  {
    id: 456456,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48",
    name: "Vacuum Cleaner",
    stock: 5,
  },
  {
    id: 567567,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=facearea&w=48&h=48",
    name: "Samsung Galaxy S21 Fe 5g",
    stock: 13,
  },
];


const TopSellingProducts = () => {
  return (
    <Card
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              marginRight: "8px",
              color: "#FF0000",
              backgroundColor: "#FF00001A",
              padding: "8px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TriangleAlert size={16} />
          </span>
          <span style={{ fontWeight: 500 }}>Low Stock Products</span>
        </div>
      }
      extra={<ViewAll link="/products" />}
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
                ID : {product.id}
              </div>
            </div>
            <div
            >
              In Stock
              <div style={{ color: "#E05525", fontSize: 16, fontWeight: 600 }}>{product.stock}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopSellingProducts;
