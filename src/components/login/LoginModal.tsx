import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth.ts";
import useErrors from "../../hooks/useErrors.ts";
import validateForm from "../../utils/formValidation.ts";
import {
  Box,
  Typography,
  Card,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  useTheme,
  Theme,
} from "@mui/material";
import FromInput from "./FormInput.tsx";
import Logo from "../presentational/Logo.tsx";
import useResolvedMode from "../../hooks/useResolvedMode.ts";

interface LoginModalProps {
  glow?: boolean;
}

export default function LoginModal({ glow = false }: LoginModalProps) {
  const { loginError, resetErrors } = useErrors();
  const { logIn, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("Stefan Tasevski");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();
  const [paperElevation, setPaperElevation] = useState(5);

  const { palette } = useTheme() as Theme;
  const resolvedMode = useResolvedMode();

  useEffect(() => {
    if (isAuthenticated) {
      resetErrors();
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    try {
      if (username && password && validateForm(username, password)) {
        logIn(username, password);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.toLowerCase().includes("username"))
          loginError({
            errorMessage: error.message,
            errorType: "invalidUsername",
          });
        if (error.message.toLowerCase().includes("password"))
          loginError({
            errorMessage: error.message,
            errorType: "invalidPassword",
          });
      } else {
        console.error("Unknown Error");
      }
    }
  }

  return (
    <Paper
      onMouseEnter={() => resolvedMode === "dark" && setPaperElevation(2)}
      onMouseLeave={() => resolvedMode === "dark" && setPaperElevation(5)}
      elevation={paperElevation}
      sx={{
        transitionDelay: 0,
        [`&.MuiPaper-elevation${2}`]: {
          boxShadow:
            resolvedMode === "dark" && glow === true
              ? "rgba(255, 202, 40, 0.2) 0px 8px 24px"
              : "",
        },
        [`&.MuiPaper-elevation${5}`]: {
          boxShadow:
            resolvedMode === "dark" && glow === true
              ? "rgba(255, 202, 40, 0.05) 0px 10px 50px, rgba(255, 202, 40, 0.12) 0px 0px 30px, rgba(255, 202, 40, 0.12) 0px 4px 6px, rgba(255, 202, 40, 0.17) 0px 12px 13px, rgba(255, 202, 40, 0.09) 0px -3px 5px"
              : "",
        },
      }}
    >
      <Card
        variant="outlined"
        sx={{
          minWidth: "fit-content",
          minHeight: "fit-content",
          width: "300px",
          p: "20px 35px 30px 35px",
          borderColor:
            resolvedMode === "dark" && glow === true
              ? palette.primary.light
              : "",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo size="medium" />
        </Box>
        <Typography
          variant="h4"
          sx={{ mb: "20px", mt: "20px", textAlign: "center" }}
        >
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2.2,
          }}
        >
          <FromInput
            type="username"
            state={username}
            setter={setUsername}
            variant="outlined"
            required={true}
          />
          <FromInput
            type="password"
            state={password}
            setter={setPassword}
            variant="outlined"
            required={true}
          />

          {/* TODO: Add remember me functionality - localStorage maybe? */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  userSelect: "none",
                  curosr: "pointer",
                }}
              >
                Remember me
              </Typography>
            }
          />
          <Button
            disableRipple
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Box>
      </Card>
    </Paper>
  );
}
