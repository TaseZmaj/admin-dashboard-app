import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
// import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import { ReactNode } from "react";
import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import useResolvedMode from "../hooks/useResolvedMode";
import { useTheme } from "@emotion/react";

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
  const { palette } = useTheme() as Theme;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "fit-content",
        height: "fit-content",
        // border: `1px solid ${palette.divider}`,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: "80%",
          height: "100%",
          marginRight: "30px",
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
          <Typography
            variant="h1"
            sx={{ fontWeight: "bold", color: palette.error.main }}
          >
            OOPS!
          </Typography>
          <Typography sx={{ fontSize: "1.2rem", pl: "8px" }}>
            <Typography sx={{ color: palette.error.main, paddingLeft: "5px" }}>
              Error: {children}
            </Typography>
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
              width: "200px",
              height: "45px",
              fontSize: "1rem",
              borderWidth: resolvedMode == "light" ? "2px" : "1px",
              borderColor:
                resolvedMode === "dark"
                  ? palette.common.white
                  : palette.common.black,
            }}
          >
            <Typography
              sx={{
                color:
                  resolvedMode === "dark"
                    ? palette.common.white
                    : palette.common.black,
              }}
            >
              Try Again
            </Typography>
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
        <CloudOffOutlinedIcon
          sx={{ fontSize: "5rem", color: palette.error.main }}
        />
      </Box>
    </Box>
  );
}
