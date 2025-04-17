import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { normalizePathname } from "../../utils/stringUtils";

export default function CustomBreadCrumbs() {
  const { pathname } = useLocation();

  return (
    <Breadcrumbs sx={{ cursor: "default" }}>
      <Typography>Pages</Typography>
      <Link sx={{ textDecoration: "none" }}>
        {pathname === "/" ? "Homepage" : normalizePathname(pathname)}
      </Link>
    </Breadcrumbs>
  );
}
