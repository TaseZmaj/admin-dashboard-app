import { Fragment, useMemo } from "react";
import { Stack, List, Divider, Typography } from "@mui/material";
import NavItem from "./NavItem";

type NavLinks =
  | "dashboard"
  | "goods"
  | "services"
  | "employees"
  | "sales channels"
  | "customers"
  | "orders"
  | "compare";

// The first element of the array must be one of the specified values.
// The rest (...) can be zero or more of the allowed values.
interface Props {
  links: [NavLinks, ...NavLinks[]];
  includeDividers: boolean;
}

export default function NavMenu({ links, includeDividers = true }: Props) {
  const stackSX = useMemo(() => {
    return {
      m: "5px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  }, []);

  return (
    <Stack sx={stackSX}>
      <List>
        {links.map((link, i) => (
          <Fragment key={i}>
            {includeDividers && link === "dashboard" && (
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "0.8rem",
                  pl: "5px",
                }}
              >
                General
              </Typography>
            )}
            {includeDividers && link === "dashboard" && <Divider />}

            <NavItem link={link}>{link}</NavItem>

            {includeDividers && link === "dashboard" && (
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "0.8rem",
                  pl: "5px",
                  mt: "10px",
                }}
              >
                Analytics
              </Typography>
            )}
            {includeDividers && link === "dashboard" && <Divider />}
          </Fragment>
        ))}
      </List>
    </Stack>
  );
}
