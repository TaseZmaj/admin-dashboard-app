import { NavLink, useLocation } from "react-router";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import capitalize from "../../../utils/capitalize";

// Icons
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";

type NavLinks =
  | "dashboard"
  | "goods"
  | "services"
  | "employees"
  | "sales channels"
  | "customers"
  | "orders"
  | "compare";

interface Props {
  children: NavLinks;
  link: NavLinks;
}

export default function NavItem({ children, link }: Props) {
  const location = useLocation();
  const theme = useTheme();

  // Mozebi toolbarot bese popametna idea.....

  const navStyles = {
    padding: 0,
    marginTop: "5px",
    backgroundColor: location.pathname === `/${link}` ? "red" : "",
    color: location.pathname === `/${link}` ? "white" : "#212121",
  };
  const iconStyles = {
    color: location.pathname === `/${link}` ? "white" : "#212121",
  };

  useEffect(() => {
    console.log(
      "If location.pathname: " + location.pathname + " === link: " + `/${link}`
    );
  }, []);

  return (
    <ListItem sx={navStyles}>
      <NavLink
        to={link === "dashboard" ? "/" : `/${link.replace(/\s+/g, "-")}`}
        style={{
          textDecoration: "none",
          flexGrow: 1,
          color: "#212121",
        }}
      >
        <ListItemButton
          dense
          sx={{
            height: "40px",
            p: "2px 7px",
            borderRadius: "5px",
          }}
        >
          <ListItemIcon>
            {link === "dashboard" && (
              <DashboardCustomizeOutlinedIcon sx={iconStyles} />
            )}
            {link === "goods" && <ShoppingBagOutlinedIcon sx={iconStyles} />}
            {link === "services" && <HandymanOutlinedIcon sx={iconStyles} />}
            {link === "employees" && <AssignmentOutlinedIcon sx={iconStyles} />}
            {link === "sales channels" && (
              <WarehouseOutlinedIcon sx={iconStyles} />
            )}
            {link === "customers" && <PeopleAltOutlinedIcon sx={iconStyles} />}
            {link === "orders" && <ShoppingCartOutlinedIcon sx={iconStyles} />}
            {link === "compare" && (
              <CompareArrowsOutlinedIcon sx={iconStyles} />
            )}
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ fontSize: "0.9rem", fontWeight: "500" }}>
              {capitalize(children)}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
}
