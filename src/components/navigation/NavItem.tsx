import { useNavigate } from "react-router";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { capitalize } from "../../utils/stringUtils";
import { NavLinks } from "../../utils/customTypes";
import useAuth from "../../hooks/useAuth";

// Icons
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

interface Props {
  children: NavLinks;
  link: NavLinks;
}

export default function NavItem({ children, link }: Props) {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  function handleNavigation() {
    if (link === "dashboard") navigate("/");
    else if (link === "logout") {
      logOut();
    } else {
      navigate(`/${link.replace(/\s+/g, "-")}`);
    }
  }

  return (
    <ListItem
      sx={{
        p: "4px 2px",
      }}
    >
      <ListItemButton
        dense
        sx={{
          height: "40px",
          p: "2px 7px",
          borderRadius: "5px",
        }}
        onClick={() => handleNavigation()}
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
          {link === "reviews" && (
            <StarBorderRoundedIcon sx={{ fontSize: "1.6rem" }} />
          )}
          {link === "logout" && <LogoutOutlinedIcon />}
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
