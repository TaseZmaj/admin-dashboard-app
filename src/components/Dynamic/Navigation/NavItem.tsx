import { useLocation, useNavigate } from "react-router";
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
// import { useEffect } from "react";
// import { useTheme } from "@mui/material/styles";

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
  // const location = useLocation();
  // const theme = useTheme();
  const navigate = useNavigate();

  // Mozebi toolbarot bese popametna idea.....

  // const navStyles = {
  //   // padding: 0,
  //   // marginTop: "5px",
  //   // backgroundColor: location.pathname === `/${link}` ? "red" : "",
  //   // color: location.pathname === `/${link}` ? "white" : "#212121",
  // };
  // const iconStyles = {
  //   color: location.pathname === `/${link}` ? "white" : "#212121",
  // };

  // const isActiveNav = location.pathname === `/${link}`;

  // useEffect(() => {
  //   console.log(
  //     "If location.pathname: " + location.pathname + " === link: " + `/${link}`
  //   );
  // }, []);

  return (
    <ListItem
      sx={{
        p: "4px 2px",
      }}
    >
      <ListItemButton
        dense
        // className={location.pathname === `/${link}` && "active"}
        sx={{
          height: "40px",
          p: "2px 7px",
          borderRadius: "5px",
        }}
        onClick={() =>
          navigate(link === "dashboard" ? "/" : `/${link.replace(/\s+/g, "-")}`)
        }
      >
        <ListItemIcon>
          {link === "dashboard" && <DashboardCustomizeOutlinedIcon />}
          {link === "goods" && <ShoppingBagOutlinedIcon />}
          {link === "services" && <HandymanOutlinedIcon />}
          {link === "employees" && <AssignmentOutlinedIcon />}
          {link === "sales channels" && <WarehouseOutlinedIcon />}
          {link === "customers" && <PeopleAltOutlinedIcon />}
          {link === "orders" && <ShoppingCartOutlinedIcon />}
          {link === "compare" && <CompareArrowsOutlinedIcon />}
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ fontSize: "0.9rem", fontWeight: "500" }}>
            {capitalize(children)}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
