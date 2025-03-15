import { Fragment } from "react";
import { Stack, List, Divider } from "@mui/material";
import NavItem from "./NavItem";
import MenuDivider from "./MenuDivider";

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
  includeDividers?: boolean;
  includeBorders?: boolean;
}

export default function NavMenu({
  links,
  includeDividers = true,
  includeBorders = true,
}: Props) {
  const stackSX = {
    m: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      {includeBorders ? <Divider /> : null}
      <Stack sx={stackSX}>
        <List>
          {links.map((link, i) => (
            <Fragment key={i}>
              {includeDividers && link === "dashboard" && (
                <MenuDivider topGap="small" fontSize="small">
                  General
                </MenuDivider>
              )}

              <NavItem link={link}>{link}</NavItem>

              {includeDividers && link === "dashboard" && (
                <MenuDivider topGap="small" fontSize="small">
                  Analytics
                </MenuDivider>
              )}
            </Fragment>
          ))}
        </List>
      </Stack>
      {includeBorders ? <Divider /> : null}
    </>
  );
}
