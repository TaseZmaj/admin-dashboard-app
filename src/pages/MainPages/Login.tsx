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
} from "@mui/material";

function Login() {
  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    console.log(event);
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
            border: "1px solid rgba(0, 0, 0, 0.12)",
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
              gap: 3,
            }}
          >
            {/* <TextField label="Username" variant="outlined" fullWidth />
            <TextField label="Password" variant="outlined" fullWidth /> */}
            <FormControl
              size="medium"
              variant="outlined"
              color="primary"
              margin="normal"
              required
              fullWidth
            >
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" />
            </FormControl>

            <FormControl
              size="medium"
              variant="outlined"
              color="primary"
              margin="normal"
              required
              fullWidth
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input type="password" id="password" />
            </FormControl>

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

export default Login;
