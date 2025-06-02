import { Fragment } from "react";
import { Stack, List, Divider, Box } from "@mui/material";
import NavItem from "./NavItem";
import MenuDivider from "./MenuDivider";
import { Percentage } from "../../utils/Types/utilTypes";
import { NavLinks } from "../../utils/Types/utilTypes";

// The first element of the array must be one of the specified values.
// The rest (...) can be zero or more of the allowed values.
interface Props {
  links: [NavLinks, ...NavLinks[]];
  includeDividers?: boolean;
  topBorder?: boolean;
  bottomBorder?: boolean;
  listWidth?: Percentage;
  position?: "bottom" | "normal";
}

export default function NavMenu({
  links,
  includeDividers = true,
  topBorder = true,
  bottomBorder = true,
  listWidth = "85%",
  position = "normal",
}: Props) {
  const stackSX = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const listSX = {
    width: listWidth,
  };
  const boxSX = {
    // mb: position === "top" ? "auto" : "7px",
    mt: position === "bottom" ? "auto" : "7px",
  };

  // TODO: Make the top and bottom border - CSS borders using palette.divider
  //instead of <Divider/>s

  return (
    <Box sx={boxSX}>
      {topBorder ? <Divider /> : null}
      <Stack sx={stackSX}>
        <List sx={listSX}>
          {links.map((link, i) => (
            <Fragment key={i}>
              {includeDividers && link === "dashboard" && (
                <MenuDivider
                  includeLine={false}
                  topGap="small"
                  fontSize="small"
                  caps={true}
                >
                  General
                </MenuDivider>
              )}

              <NavItem link={link}>{link}</NavItem>

              {includeDividers && link === "dashboard" && (
                <MenuDivider
                  includeLine={false}
                  topGap="small"
                  fontSize="small"
                  caps={true}
                >
                  Analytics
                </MenuDivider>
              )}
            </Fragment>
          ))}
        </List>
      </Stack>
      {bottomBorder ? <Divider /> : null}
    </Box>
  );
}
