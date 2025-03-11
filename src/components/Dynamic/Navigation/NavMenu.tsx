import { Stack, List, Divider } from "@mui/material";
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
}

export default function NavMenu({ links }: Props) {
  return (
    <>
      <Divider />
      <Stack
        sx={{
          m: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <List>
          {links.map((link, i) => (
            <>
              {/* {link === "dashboard" && (
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "0.8rem",
                    pl: "5px",
                  }}
                >
                  General
                </Typography>
              )} */}

              <NavItem key={i} link={link}>
                {link}
              </NavItem>

              {/* {link === "dashboard" && (
                <Typography
                  sx={{ fontWeight: "600", fontSize: "0.8rem", pl: "5px" }}
                >
                  Analytics
                </Typography>
              )} */}
              {/* {link === "dashboard" && <Divider />} */}
            </>
          ))}
        </List>
      </Stack>
    </>
  );
}
