import { NavLink } from "react-router-dom";

import { theme } from "antd";
import { useState } from "react";

const { useToken } = theme;

const ViewAll = ({ link }: { link: string }) => {
  const { token } = useToken();
  const [isHovered, setIsHovered] = useState(false);

  const viewAllStyle = {
    textDecoration: "underline",
    color: isHovered ? token.colorPrimary : "#000",
    transition: "color 0.3s",
  };

  return (
    <NavLink
      to={link}
      style={viewAllStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      View All
    </NavLink>
  );
};

export default ViewAll;
