import { Divider, Typography } from "@mui/material";
import capitalize from "../../../utils/capitalize";

interface Props {
  fontSize?: "tiny" | "small" | "medium" | "large" | "extra large";
  textPos?: "right" | "center" | "left";
  topGap?: "none" | "small" | "medium" | "large";
  fontWeight?: "light" | "normal" | "bold";
  caps?: boolean;
  includeLine?: boolean;
  children: string;
}

const FONT_WEIGHTS = {
  light: 300,
  normal: 400,
  bold: 600,
};

const FONT_SIZES = {
  tiny: "0.65rem",
  small: "0.8rem",
  medium: "1rem",
  large: "1.2rem",
  "extra large": "1.4rem",
};

const TOP_GAPS = {
  none: "0px",
  small: "7px",
  medium: "15px",
  large: "25px",
};

export default function MenuDivider({
  fontWeight = "normal",
  fontSize = "medium",
  textPos = "left",
  topGap = "small",
  includeLine = true,
  caps = false,
  children,
}: Props) {
  const dividerSX = {
    fontWeight: FONT_WEIGHTS[fontWeight],
    fontSize: FONT_SIZES[fontSize],
    pl: textPos === "left" ? "5px" : 0,
    pr: textPos === "right" ? "5px" : 0,
    mt: TOP_GAPS[topGap],
    textAlign: textPos,
  };

  return (
    <>
      <Typography sx={dividerSX}>
        {caps ? capitalize(children).toUpperCase() : capitalize(children)}
      </Typography>
      {includeLine ? <Divider /> : null}
    </>
  );
}
