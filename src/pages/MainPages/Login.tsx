import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  FormControl,
  Typography,
  InputLabel,
  Input,
  Card,
  Button,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import validateForm from "../../utils/formValidation";
import CustomInput from "../../components/CustomInput";

export default function Login() {
  const { logIn, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passVisibility, setPassVisibility] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // TODO: Swap the error use states with the useError() context

  useEffect(() => {
    if (isAuthenticated) {
      handleResetErrors();
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
        console.error(error);
        setErrorMessage(error.message);
      } else {
        console.error("Unknown Error");
      }
      setError(true);
    }
  }

  function handleResetErrors() {
    setError(false);
    setErrorMessage("");
  }

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            minWidth: "fit-content",
            minHeight: "fit-content",
            width: "300px",
            p: "20px 35px 30px 35px",
          }}
        >
          {/* TODO: Insert Tranzit.mk logo here */}
          <Typography variant="h4" sx={{ mb: "20px", mt: "10px" }}>
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
            {/*TODO: Swap the error use states with the useError() context */}
            <CustomInput
              type="username"
              state={username}
              setter={setUsername}
            />

            <CustomInput
              type="password"
              state={password}
              setter={setPassword}
            />

            {/* <Box
              sx={{
                height: "70px",
              }}
            >
              <FormControl
                onFocus={() => handleResetErrors()}
                size="medium"
                variant="outlined"
                color="primary"
                margin="normal"
                required
                fullWidth
                error={
                  error && errorMessage.includes("username") ? true : false
                }
              >
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
                {error && errorMessage.includes("username") ? (
                  <FormHelperText error variant="standard" id="my-helper-text">
                    {errorMessage}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Box>

            <Box
              sx={{
                height: "70px",
              }}
            >
              <FormControl
                onFocus={() => handleResetErrors()}
                size="medium"
                variant="outlined"
                color="primary"
                margin="normal"
                required
                fullWidth
                error={
                  error && errorMessage.includes("password") ? true : false
                }
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  type={!passVisibility ? "password" : ""}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passVisibility ? (
                  <VisibilityOutlinedIcon
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 21,
                      cursor: "pointer",
                      transition: "all 0.1s ease-in-out",
                      ":hover": {
                        scale: 1.15,
                      },
                    }}
                    color="warning"
                    onClick={() => setPassVisibility((v) => !v)}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 21,
                      cursor: "pointer",
                      transition: "all 0.1s ease-in-out",
                      ":hover": {
                        scale: 1.15,
                      },
                    }}
                    onClick={() => setPassVisibility((v) => !v)}
                  />
                )}
                {error && errorMessage.includes("password") ? (
                  <FormHelperText error variant="standard" id="my-helper-text">
                    {errorMessage}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Box> */}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={
                <Typography sx={{ fontSize: "0.9rem" }}>Remember me</Typography>
              }
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}
