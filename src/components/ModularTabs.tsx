import { Box, SxProps, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router";
import { normalizePathname } from "../utils/stringUtils";

type TabNames = "Analytics" | "List";

interface CustomTabsProps {
  sx?: SxProps;
  children: React.ReactNode;
  tabNames: [TabNames, ...TabNames[]];
}

export default function ModularTabs({
  sx = {},
  tabNames,
  children,
}: CustomTabsProps) {
  const [value, setValue] = useState(0);
  const { pathname } = useLocation();

  function handleChange(_event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

  return (
    <Box sx={{ ...sx }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          {tabNames.map((tabName, i) =>
            tabName === "List" ? (
              <Tab key={i} label={`${normalizePathname(pathname)} List`} />
            ) : (
              <Tab key={i} label={tabName} />
            )
          )}
        </Tabs>
      </Box>
      {Array.isArray(children) &&
        children.map((node, i) => (
          <TabPanel value={value} index={i} key={i}>
            {node}
          </TabPanel>
        ))}
    </Box>
  );
}

function TabPanel({ children, value, index, ...other }: any) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ flexGrow: 1, overflowY: "auto" }}
      {...other}
    >
      {value === index && <Box sx={{ pt: "20px" }}>{children}</Box>}
    </Box>
  );
}
