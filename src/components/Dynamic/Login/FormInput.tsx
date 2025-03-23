import { useState } from "react";
import useErrors from "../../../hooks/useErrors.ts";
import capitalize from "../../../utils/capitalize.ts";
import {
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
  SxProps,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface Props {
  sx?: SxProps;
  type?: "username" | "password" | "search";
  variant?: "outlined" | "filled" | "standard";
  required?: boolean;
  state: string;
  setter: (value: string) => void;
}

export default function FormInput({
  type = "search",
  state,
  setter,
  variant = "standard",
  sx = {},
  required = false,
}: Props) {
  const { error, errorMessage, resetErrors } = useErrors();
  const [passVisibility, setPassVisibility] = useState(false);

  // TODO: Make this component as ABSTRACT as possible

  return (
    <Box
      sx={{
        height: "70px",
        ...sx,
      }}
    >
      <FormControl
        onFocus={() => resetErrors()}
        size="medium"
        variant={variant}
        color="primary"
        margin="normal"
        required={required}
        fullWidth
        error={error && errorMessage.includes(type) ? true : false}
      >
        <InputLabel htmlFor={type}>{capitalize(type)}</InputLabel>

        {/* Autofocus on username input */}

        {type === "username" && (
          <Input
            autoFocus
            id={type}
            type={type}
            value={state}
            onChange={(event: { target: { value: string } }) =>
              setter(event.target.value)
            }
          />
        )}
        {type === "search" && (
          <Input
            autoFocus
            id={type}
            type={type}
            value={state}
            onChange={(event: { target: { value: string } }) =>
              setter(event.target.value)
            }
          />
        )}
        {type === "password" && (
          <Input
            id={type}
            type={!passVisibility ? "password" : ""}
            value={state}
            onChange={(event: { target: { value: string } }) =>
              setter(event.target.value)
            }
          />
        )}

        {/* Password Visibility Icon */}
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
