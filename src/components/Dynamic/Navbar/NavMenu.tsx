import { Stack, List, ListItem } from "@mui/material";
import { NavLink } from "react-router";
import capitalize from "../../../utils/capitalize.ts";

// The first element of the array must be one of the specified values.
// The rest (...) can be zero or more of the allowed values.
interface Props {
  links: [
    (
      | "dashboard"
      | "goods"
      | "services"
      | "analytics"
      | "sales channels"
      | "customers"
      | "orders"
      | "compare"
    ),
    ...(
      | "dashboard"
      | "goods"
      | "services"
      | "analytics"
      | "sales channels"
      | "customers"
      | "orders"
      | "compare"
    )[]
  ];
}

// TODO: Check out the dashboard layout MUI - "https://mui.com/toolpad/core/react-dashboard-layout/"
//Mozebi e podobro od moevo...

export default function NavMenu({ links }: Props) {
  return (
    <Stack>
      <List>
        {links.map((link) => (
          <ListItem>
            <NavLink to={`/${link.replace(/\s+/g, "-")}`}>
              {capitalize(link)}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
