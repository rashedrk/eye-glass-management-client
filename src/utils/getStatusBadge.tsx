const statusMap = {
  processing: { label: "Processing", color: "#7C3AED", bg: "#F3F0FF" },
  completed: { label: "Completed", color: "#12B76A", bg: "#E6FFF3" },
  onhold: { label: "Onhold", color: "#06AED4", bg: "#E0F7FA" },
  cancelled: { label: "Cancelled", color: "#FF4D4F", bg: "#FFF0F0" },
};

export function getStatusBadge(status: string) {
  const s = statusMap[status as keyof typeof statusMap] || {
    label: status,
    color: "#888",
    bg: "#f0f0f0",
  };
  return (
    <span
      style={{
        background: s.color,
        color: "white",
        borderRadius: 5,
        padding: "3px 8px",
        fontSize: 10,
        fontWeight: 600,
        display: "inline-block",
        marginLeft: 8,
      }}
    >
      {s.label}
    </span>
  );
}
