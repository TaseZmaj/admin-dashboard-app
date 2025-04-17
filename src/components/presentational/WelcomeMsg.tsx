import { Box, Typography } from "@mui/material";
import { capitalize } from "../../utils/stringUtils";
import useAuth from "../../hooks/useAuth";

export default function WelcomeMsg() {
  const { username } = useAuth();

  return (
    <Box sx={{ flexDirection: "column" }}>
      <Typography variant="h3" sx={{ fontSize: "1.25rem" }}>
        Welcome back, {capitalize(username)}!
      </Typography>
      <Typography color="textSecondary" sx={{ pt: "6px", fontSize: "0.9rem" }}>
        Here's whats been going on with the business lately...
      </Typography>
    </Box>
  );
}
