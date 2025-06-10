import { Box, Button, SxProps, Typography } from "@mui/material";
// import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import { ReactNode } from "react";
import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import useResolvedMode from "../hooks/useResolvedMode";

interface ErrorBoxProps {
  sx?: SxProps;
  children: ReactNode;
  tryAgainFunc: () => Promise<void>;
}

export default function ErrorBox({
  sx,
  children,
  tryAgainFunc,
}: ErrorBoxProps) {
  const resolvedMode = useResolvedMode();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "555px",
        height: "fit-content",
        // border: `1px solid ${palette.divider}`,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: "100%",
          //   borderRight: `1px solid ${palette.divider}`,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "80%",
            pt: "25px",
            pl: "10px",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h1" sx={{ fontWeight: "bold" }}>
            OOPS!
          </Typography>
          <Typography sx={{ fontSize: "1.2rem", pl: "8px" }}>
            {children}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            size="large"
            variant="outlined"
            onClick={tryAgainFunc}
            sx={{
              mt: "16px",
              width: "150px",
              fontSize: "1rem",
              borderWidth: resolvedMode == "light" ? "2px" : "1px",
            }}
          >
            Try Again
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <SentimentDissatisfiedRoundedIcon sx={{ fontSize: "5rem" }} /> */}
        <CloudOffOutlinedIcon sx={{ fontSize: "5rem" }} />
      </Box>
    </Box>
  );
}
