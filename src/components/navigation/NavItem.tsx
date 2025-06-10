import { useNavigate } from "react-router";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { capitalize, normalizePathname } from "../../utils/stringUtils";
import { NavLinks } from "../../utils/Types/utilTypes";
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
import { useLocation } from "react-router";
import { useTheme } from "@emotion/react";

interface Props {
  sx?: SxProps;
  children: NavLinks;
  link: NavLinks;
}

export default function NavItem({ sx, children, link }: Props) {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { palette } = useTheme() as Theme;

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
          // backgroundColor:
          //   normalizePathname(pathname) == capitalize(link)
          //     ? palette.divider
          //     : null,
          color:
            normalizePathname(pathname) == capitalize(link) ||
            (link == "dashboard" && pathname == "/")
              ? palette.primary.main
              : null,
          boxSizing: "border-box",

          ...sx,
        }}
        onClick={() => handleNavigation()}
      >
        <ListItemIcon>
          {link === "dashboard" && (
            <DashboardCustomizeOutlinedIcon
              sx={{
                color:
                  link == "dashboard" && pathname == "/"
                    ? palette.primary.main
                    : null,
              }}
            />
          )}
          {link === "goods" && (
            <ShoppingBagOutlinedIcon
              sx={{
                color:
                  normalizePathname(pathname) == capitalize(link)
                    ? palette.primary.main
                    : null,
              }}
            />
          )}
          {link === "services" && (
            <HandymanOutlinedIcon
              sx={{
                color:
                  normalizePathname(pathname) == capitalize(link)
                    ? palette.primary.main
                    : null,
              }}
            />
          )}
          {link === "employees" && (
            <AssignmentOutlinedIcon
              sx={{
                color:
                  normalizePathname(pathname) == capitalize(link)
                    ? palette.primary.main
                    : null,
              }}
            />
          )}
          {link === "sales channels" && (
            <WarehouseOutlinedIcon
              sx={{
                color:
                  normalizePathname(pathname) == capitalize(link)
                    ? palette.primary.main
                    : null,
              }}
            />
          )}
          {link === "customers" && (
            <PeopleAltOutlinedIcon
              sx={{
                color:
                  normalizePathname(pathname) == capitalize(link)
                    ? palette.primary.main
                    : null,
              }}
            />
          )}
          {link === "orders" && (
            <ShoppingCartOutlinedIcon
              sx={{
                color:
                  normalizePathname(pathname) == capitalize(link)
                    ? palette.primary.main
                    : null,
              }}
            />
          )}
          {link === "compare" && (
            <CompareArrowsOutlinedIcon
              sx={{
                color:
                  normalizePathname(pathname) == capitalize(link)
                    ? palette.primary.main
                    : null,
              }}
            />
          )}
          {link === "reviews" && (
            <StarBorderRoundedIcon
              sx={{
                fontSize: "1.6rem",
                color:
                  normalizePathname(pathname) == capitalize(link)
                    ? palette.primary.main
                    : null,
              }}
            />
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
