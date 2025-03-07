import {
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import useErrors from "../hooks/useErrors";
import { useState } from "react";
import capitalize from "../utils/capitalize";

interface Props {
  type: "username" | "password";
  state: string;
  setter: (value: string) => void;
}

export default function CustomInput({ type, state, setter }: Props) {
  const { error, errorMessage, resetErrors } = useErrors();
  const [passVisibility, setPassVisibility] = useState(false);

  return (
    <Box
      sx={{
        height: "70px",
      }}
    >
      <FormControl
        onFocus={() => resetErrors()}
        size="medium"
        variant="outlined"
        color="primary"
        margin="normal"
        required
        fullWidth
        error={error && errorMessage.includes(type) ? true : false}
      >
        <InputLabel htmlFor={type}>{capitalize(type)}</InputLabel>
        <Input
          id={type}
          type={type === "password" && !passVisibility ? "password" : ""}
          value={state}
          onChange={(event: { target: { value: string } }) =>
            setter(event.target.value)
          }
          autoFocus
        />

        {type === "password" ? (
          passVisibility ? (
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
          )
        ) : null}

        {error && errorMessage.includes(type) ? (
          <FormHelperText error variant="standard" id="my-helper-text">
            {errorMessage}
          </FormHelperText>
        ) : null}
      </FormControl>
    </Box>
  );
}
