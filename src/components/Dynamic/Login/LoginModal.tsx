import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useErrors from "../../../hooks/useErrors";
import validateForm from "../../../utils/formValidation";
import {
  Box,
  Typography,
  Card,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import FromInput from "../../../components/Dynamic/Login/FormInput.tsx";
import Logo from "../../../components/Presentational/Logo.tsx";

export default function Login() {
  const { loginError, resetErrors } = useErrors();
  const { logIn, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("Stefan Tasevski");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();

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
    <Paper elevation={8}>
      <Card
        variant="outlined"
        sx={{
          minWidth: "fit-content",
          minHeight: "fit-content",
          width: "300px",
          p: "20px 35px 30px 35px",
          // boxShadow: " 0px 0px 68px 0px rgba(255,201,40,0.49)",
          // border: "none",
          // boxShadow: "0px 0px 212px 18px rgba(255,204,128,1)",
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
          sx={{ mb: "20px", mt: "10px", textAlign: "center" }}
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
          />
          <FromInput
            type="password"
            state={password}
            setter={setPassword}
            variant="outlined"
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
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Card>
    </Paper>
  );
}
